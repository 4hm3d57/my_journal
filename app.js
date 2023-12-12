const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.urlencoded({ extended: false}));

//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'signup.html'));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login.html'));
})

app.get('/journal', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'journal.html'));
})


app.listen(PORT, (req, res) => {
    console.log(`server is running in http://localhost:${PORT}`);
})