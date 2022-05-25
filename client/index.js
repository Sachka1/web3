const express = require('express');
const app = express();
const path = require('path')

app.use(express.static('./'));

app.get('/darina', function(req, res) { 
    res.sendFile(path.join(__dirname,'Shurygina.html'));
});

app.get('/sasha', function(req, res) { 
    res.sendFile(path.join(__dirname,'Deryabin.html'));
});

app.listen(4000);

console.log('Start client');