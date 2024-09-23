const express = require('express');
const path = require('path');

const app = express();

app.set('view engine','ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// define routes
app.get('/', function (req, res){
 res.render("home");
 });

// Start the server
app.listen(3000);
console.log('Node app is running on port 3000');