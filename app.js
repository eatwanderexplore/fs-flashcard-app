const express = require('express');
const app = express();

app.set('view engine','ejs');
app.get('/', function (req, res){
 res.render("home");
 });

 
app.listen(3000);
console.log('Node app is running on port 3000');