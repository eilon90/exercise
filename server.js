const express = require('express');
const path = require('path');
const app = express();
const api = require('./server/routes/api');
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'build')));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})
app.use('/', api);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = 4000;
app.listen(process.env.PORT || port, function() {
    console.log(`Running at port ${port}`);
})