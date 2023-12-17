const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/web_tests');

const userSchema = new mongoose.Schema({
  username: String,
  password: String 
})

const userModel = mongoose.model("users", userSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'signup.html'));
}); 

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login.html'));
})

app.get('/journal', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'journal.html'));
})

// handle signup post request
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
      // check if the user exists in the database
      const existingUser = await userModel.findOne({ username });
      if (existingUser) {
        return res.send('Username already taken, please try another name.');
      }
  
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // save the user data in the database
      const newUser = new userModel({ username, password: hashedPassword });
      await newUser.save();
  
      res.send('Signup successful! You can now log in.');
    } catch (error) {
      console.log('Error during signup: ', error);
      res.status(500).send('An error occurred while signing up.');
    }
  });
  
  // handling login post request
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // try to find the user in the database
      const user = await userModel.findOne({ username });
      if (!user) {
        return res.send('User was not found, please check your username');
      }
  
      // compare the password with the hashed password stored in the database
      // Use user.password instead of hashedPassword here
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.redirect('/journal');
      } else {
        res.send('Invalid password, please try again');
      }
    } 
    catch (error) {
      res.status(500).send('An error occurred during login');
    }
  });



app.listen(PORT, () => {
  console.log(`server is running in http://localhost:${PORT}`);
})