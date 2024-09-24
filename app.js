const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const conn = require('./dbConfig');

app.set('view engine','ejs');

app.use(session({
    secret: 'yoursecret',
    resave: true,
    saveUninitialized: true
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

// login user
app.post('/auth', function(req, res) {
    let name = req.body.username;
    let password = req.body.password;
    if (name && password) {
        conn.query('SELECT * FROM user WHERE username = ? AND password_hash = ?', [name, password],
        function(error, results, fields){
            if (error) throw error;
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = name;
                // need to add if user is admin redirect to admin dashboard else redirect to student dashboard
                res.redirect('/admindashboard');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
 });

 // users can access if logged in
 app.get('/admindashboard', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('admindashboard');
    } else {
        res.send('Please login to view this page!');
    }
 });

 // log user out
 app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
 });

// Start the server
app.listen(3000);
console.log('Node app is running on port 3000');