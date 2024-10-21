const express = require('express');
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');
require('dotenv').config();
const path = require('path');
const conn = require('./dbConfig');

app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define routes
app.get('/', function (req, res) {
    res.render("home");
});

app.get('/login', function (req, res) {
    res.render("login");
})

// admin users can access if logged in
app.get('/admindashboard', function (req, res, next) {
    if (req.session.loggedin && req.session.isAdmin === 1) {

        let sql = "SELECT * FROM user";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            res.render('admindashboard', {userData: result});
        })
        
    } else {
        res.send('Please login as admin to view this page!');
    }
});

// student users can access if logged in
app.get('/studentdash', function (req, res, next) {
    let studentID = req.session.userId;
    let level = req.query.level;

    if (req.session.loggedin) {
        let query = "SELECT * FROM flashcards WHERE userID = ?";
        let queryParams = [studentID];

        // If level is specified, filter by level
        if (level) {
            query += " AND level = ?";
            queryParams.push(level);
        }

        conn.query(query, queryParams, function (err, result) {
            if (err) throw err;
            // console.log(result);  // Debugging to ensure correct results
            res.render('studentdash', { title: 'View Flashcards', flashcardsData: result });
        });
    } else {
        res.send('Please login as student to view this page!');
    }
});

// login user
app.post('/auth', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    
    if (username && password) {
        // First, fetch the user by username only
        conn.query('SELECT * FROM user WHERE username = ?', [username], function (error, results) {
            if (error) {
                console.error('Login error:', error);
                return res.status(500).send('An error occurred during login');
            }
            
            if (results.length > 0) {
                const user = results[0];
                
                if (password === user.password_hash) {  // Note: Should use proper password hashing in production
                    // Password is correct
                    req.session.loggedin = true;
                    req.session.userId = user.userID;
                    req.session.isAdmin = user.is_admin;
                    
                    // Begin a transaction to ensure all updates are atomic
                    conn.beginTransaction(function(err) {
                        if (err) {
                            console.error('Transaction error:', err);
                            return res.status(500).send('An error occurred during login');
                        }

                        // 1. Update last_login time in user table
                        conn.query(
                            'UPDATE user SET last_login = NOW() WHERE userID = ?',
                            [user.userID],
                            function(updateError) {
                                if (updateError) {
                                    return conn.rollback(function() {
                                        console.error('Error updating last_login:', updateError);
                                        res.status(500).send('An error occurred during login');
                                    });
                                }

                                // 2. Insert login record and store loginID in the session
                                conn.query(
                                    'INSERT INTO LoginLog (userID, loginTime) VALUES (?, NOW())',
                                    [user.userID],
                                    function(logError, logResults) {
                                        if (logError) {
                                            return conn.rollback(function() {
                                                console.error('Error inserting login log:', logError);
                                                res.status(500).send('An error occurred during login');
                                            });
                                        }

                                        // Commit the transaction
                                        conn.commit(function(commitErr) {
                                            if (commitErr) {
                                                return conn.rollback(function() {
                                                    console.error('Commit error:', commitErr);
                                                    res.status(500).send('An error occurred during login');
                                                });
                                            }

                                            // Store the loginID in the session
                                            req.session.loginId = logResults.insertId;
                                            
                                            // Save session before redirecting
                                            req.session.save(function(saveErr) {
                                                if (saveErr) {
                                                    console.error('Session save error:', saveErr);
                                                    return res.status(500).send('An error occurred during login');
                                                }
                                                
                                                // Redirect after session is saved
                                                if (user.is_admin) {
                                                    res.redirect('/admindashboard');
                                                } else {
                                                    res.redirect('/studentdash');
                                                }
                                            });
                                        });
                                    }
                                );
                            }
                        );
                    });
                } else {
                    res.status(401).send('Incorrect username and/or password');
                }
            } else {
                res.status(401).send('Incorrect username and/or password');
            }
        });
    } else {
        res.status(400).send('Please enter both username and password');
    }
});

// student can add new flashcard
app.post('/addCard', function (req, res, next) {
    const topicName = req.body.topic;
    const question = req.body.question;
    const answer = req.body.answer;
    const studentID = req.session.userId;

    if (!studentID) {
        return res.render('studentdash', { error: 'You must be logged in to create a flashcard.', flashcardsData: [] });
    }

    if (topicName && question && answer) {
        // Check if topic exists and get ID
        let getTopicSql = 'SELECT topicID FROM topics WHERE name = ?';
        conn.query(getTopicSql, [topicName], function (err, topicResults) {
            if (err) {
                console.error('Error checking topic', err);
                return res.render('studentdash', { error: 'An error occurred while processing your request. Please try again.', flashcardsData: [] });
            }

            let topicID;
            if (topicResults.length > 0) {
                topicID = topicResults[0].topicID;
                insertFlashcard(topicID);
            } else {
                // Topic doesn't exist, create it
                let createTopicSql = 'INSERT INTO topics (name) VALUES (?)';
                conn.query(createTopicSql, [topicName], function (err, result) {
                    if (err) {
                        console.error('Error creating new topic', err);
                        return res.render('studentdash', { error: 'An error occurred while creating a new topic. Please try again.', flashcardsData: [] });
                    }
                    topicID = result.insertId;
                    insertFlashcard(topicID);
                });
            }
        });
    } else {
        console.log("All fields must be filled out.");
        fetchFlashcardsAndRender('All fields must be filled out. Please try again.', null);
    }

    function insertFlashcard(topicID) {
        let sql = `INSERT INTO flashcards (topicID, question, answer, userID) VALUES (?, ?, ?, ?)`;
        let values = [topicID, question, answer, studentID];
        conn.query(sql, values, function (err, result) {
            if (err) {
                console.error('Error inserting new card', err);
                fetchFlashcardsAndRender('An error occurred while submitting your flashcard. Please try again.', null);
            } else {
                console.log('New flashcard created');
                fetchFlashcardsAndRender(null, 'Flashcard has been created.');
            }
        });
    }

    function fetchFlashcardsAndRender(error, message) {
        let query = "SELECT * FROM flashcards WHERE userID = ?";
        conn.query(query, [studentID], function (err, flashcardsData) {
            if (err) {
                console.error('Error fetching flashcards', err);
                return res.render('studentdash', { error: 'An error occurred while fetching flashcards.', flashcardsData: [] });
            }
            res.render('studentdash', { message: "New Flashcard has been created", flashcardsData: flashcardsData });
        });
    }
});

// student can change flashcard level
app.post('/updateFlashcardLevel/:cardID', function (req, res) {
    let cardId = req.params.cardID;
    let action = req.body.action;

    conn.query("SELECT level FROM flashcards WHERE cardID = ?", [cardId], function (err, result) {
        if (err) return res.json({ success: false });

        let currentLevel = result[0].level;
        let newLevel = currentLevel;

        if (action === 'know' && currentLevel < 5) {
            newLevel++; // Increase level by 1, up to 5
        } else if (action === 'dontKnow' && currentLevel > 1) {
            newLevel = 1; // Reset to level 1
        }

        // Update the level in the database
        conn.query("UPDATE flashcards SET level = ? WHERE cardID = ?", [newLevel, cardId], function (err, result) {
            if (err) return res.json({ success: false });

            return res.json({ success: true });
        });
    });
});
// student can edit flashcards
app.get('/editcards', function (req, res, next) {
    let studentID = req.session.userId;

    if (req.session.loggedin) {
        let query = "SELECT * FROM flashcards WHERE userID = ?";
        let queryParams = [studentID];

        conn.query(query, queryParams, function (err, result) {
            if (err) throw err;
            res.render('editcards', { title: 'View/Edit Flashcards', flashcardsData: result });
        });
    } else {
        res.send('Please login as student to view this page!');
    }
});

//delete item from feedback list
app.post('/delete', function (req, res) {
    let studentID = req.session.userId;
    let id = req.body.cardID;

    console.log(req.body);
    var sql = `DELETE FROM flashcards WHERE cardID=?`;
    conn.query(sql, [id], function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error deleting flashcard.' });
        }
        console.log("Flashcard deleted");

        // Fetch flashcards again and send success response
        fetchFlashcardsAndRender();
    });

    function fetchFlashcardsAndRender() {
        let query = "SELECT * FROM flashcards WHERE userID = ?";
        conn.query(query, [studentID], function (err, flashcardsData) {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Error fetching flashcards.' });
            }
            res.json({ success: true, message: "Flashcard deleted successfully", flashcardData: flashcardsData });
        });
    }
});

app.get('/logout', function(req, res) {
    if (req.session.loginId) {
        // Update the logout time in LoginLog
        conn.query(
            'UPDATE LoginLog SET logoutTime = NOW() WHERE loginID = ?',
            [req.session.loginId],
            function(error) {
                if (error) {
                    console.error('Error updating logout time:', error);
                }
                
                // Destroy the session and redirect regardless of the update result
                req.session.destroy(function(err) {
                    if (err) {
                        console.error('Session destruction error:', err);
                    }
                    res.redirect('/');
                });
            }
        );
    } else {
        // If no loginId in session, just destroy the session and redirect
        req.session.destroy(function(err) {
            if (err) {
                console.error('Session destruction error:', err);
            }
            res.redirect('/');
        });
    }
});

// Start the server
app.listen(3001);
console.log('Node app is running on port 3001');