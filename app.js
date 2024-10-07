const express = require('express');
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');
require('dotenv').config();
const path = require('path');
const conn = require('./dbConfig');

app.set('view engine','ejs');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// define routes
app.get('/', function (req, res){
 res.render("home");
 });

app.get('/login', function(req, res){
    res.render("login");
})

 // admin users can access if logged in
 app.get('/admindashboard', function (req, res, next) {
    if (req.session.loggedin && req.session.isAdmin === 1) {
        res.render('admindashboard');
    } else {
        res.send('Please login as admin to view this page!');
    }
 });

 // student users can access if logged in
 app.get('/studentdash', function (req, res, next) {
    let studentID = req.session.userId;

    if (req.session.loggedin) {
        conn.query("SELECT * FROM flashcards WHERE userID = ?", [studentID], function(err, result){
            if (err) throw err;
            console.log(result);
            res.render('studentdash', {title: 'View Flashcards', flashcardsData: result });
        });  
    } else {
        res.send('Please login as student to view this page!');
    }
 });

// login user
app.post('/auth', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        // First, fetch the user by username only
        conn.query('SELECT * FROM user WHERE username = ?', [username], function(error, results) {
            if (error) {
                console.error('Login error:', error);
                return res.status(500).send('An error occurred during login');
            }

            if (results.length > 0) {
                const user = results[0];
                
                // // Compare the provided password with the stored hash
                // bcrypt.compare(password, user.password_hash, function(err, match) {
                //     if (err) {
                //         console.error('Password comparison error:', err);
                //         return res.status(500).send('An error occurred during login');
                //     }

                    // if (match) {
                    if (password === user.password_hash) {
                        // Password is correct
                        req.session.loggedin = true;
                        req.session.userId = user.userID; 
                        req.session.isAdmin = user.is_admin; 

                        // Redirect user based on user type
                        if (user.is_admin) {
                            res.redirect('/admindashboard');
                        } else {
                            res.redirect('/studentdash');
                        }
                    } else {
                        res.status(401).send('Incorrect username and/or password');
                    }
                // });
            } else {
                res.status(401).send('Incorrect username and/or password');
            }
        });
    } else {
        res.status(400).send('Please enter both username and password');
    }
});

 // student can add new flashcard
 app.post('/addCard', function(req, res, next) {
    const topicName = req.body.topic;
    const question = req.body.question;
    const answer = req.body.answer;
    const studentID = req.session.userId;

    if (!studentID) {
        return res.render('studentdash', {error: 'You must be logged in to create a flashcard.'});
    }

    if (topicName && question && answer) {
        // Check if topic exists and get ID
        let getTopicSql = 'SELECT topicID FROM topics WHERE name = ?';
        conn.query(getTopicSql, [topicName], function(err, topicResults) {
            if (err) {
                console.error('Error checking topic', err);
                return res.render('studentdash', {error: 'An error occurred while processing your request. Please try again.'});
            }

            let topicID;
            if (topicResults.length > 0) {
                topicID = topicResults[0].topicID;
                insertFlashcard(topicID);
            } else {
                // Topic doesn't exist, create it
                let createTopicSql = 'INSERT INTO topics (name) VALUES (?)';
                conn.query(createTopicSql, [topicName], function(err, result) {
                    if (err) {
                        console.error('Error creating new topic', err);
                        return res.render('studentdash', {error: 'An error occurred while creating a new topic. Please try again.'});
                    }
                    topicID = result.insertId;
                    insertFlashcard(topicID);
                });
            }
        });
    } else {
        console.log("All fields must be filled out.");
        res.render('studentdash', { error: 'All fields must be filled out. Please try again.'});
    }

    function insertFlashcard(topicID) {
        let sql = `INSERT INTO flashcards (topicID, question, answer, userID) VALUES (?, ?, ?, ?)`;
        let values = [topicID, question, answer, studentID];
        conn.query(sql, values, function(err, result) {
            if (err) {
                console.error('Error inserting new card', err);
                return res.render('studentdash', {error: 'An error occurred while submitting your flashcard. Please try again.'});
            }
            console.log('New flashcard created');
            res.render('studentdash', {message: 'Flashcard has been created.'});
        });
    }
});

 // log user out
 app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
 });

// Start the server
app.listen(3001);
console.log('Node app is running on port 3001');