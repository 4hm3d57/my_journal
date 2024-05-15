const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const session = require('express-session');

const app = express();
const PORT = 3000;



mongoose.connect('mongodb://localhost:27017/new_journal');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/view') )

const userSchema_user = new mongoose.Schema({
  username: String,
  password: String 
})


const userSchema_journal = new mongoose.Schema({  
    title: String,
    content: String,
    user: String,
    date: { type: Date, default: Date.now }
});



const userModel_user = mongoose.model("users", userSchema_user);
const userModel_journal = mongoose.model("journal", userSchema_journal);

//module.exports = userModel_journal

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    if(req.session && req.session.user){
        req.user = req.session.user;
    }
    next();
});

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
      const existingUser = await userModel_user.findOne({ username });
      if (existingUser) {
        return res.send('Username already taken, please try another name.');
      }
  
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // save the user data in the database
      const newUser = new userModel_user({ username, password: hashedPassword });
      await newUser.save();

      req.session.user = { username };

  
      //res.send('Signup successful! You can now log in.');
      res.redirect('/journal');
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
      const user = await userModel_user.findOne({ username });
      if (!user) {
        return res.send('User was not found, please check your username');
      }
  
      // compare the password with the hashed password stored in the database
      // Use user.password instead of hashedPassword here
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        req.session.user = { username };
        res.redirect('/journal');
      } else {
        res.send('Invalid password, please try again');
      }
    } 
    catch (error) {
      res.status(500).send('An error occurred during login');
    }
  });


app.post('/save-journal', async(req, res) => {
    const { title, content } = req.body;

    const currentUser = req.user;

    console.log('Received data: ', { title, content, currentUser });
    
    const newJournalEntry = new userModel_journal({
        title: title,
        content: content,
        user: currentUser.username
    });

    try{
        const savedEntry = await newJournalEntry.save();
        console.log('Journal entry saved', savedEntry);
        //res.json({ message: 'Journal entry saved.' });
        res.redirect('after_journal.html')

    }catch(error){
        res.status(500).send('An error occurred: ', error);
    }

});


app.get('/save-journal', async (req, res) => {
    try {
        const latestEntries = await userModel_journal.find().sort({ _id: -1 });
        res.render('index', { latestEntries });
    } catch (error) {
        console.log('An error occurred: ', error);
        res.status(500).send('An error occurred');
    }
});

app.post('/delete-journal', async(req, res) => {
    const journalId = req.body.journalId;

    try{
        //find the journal entry by ID and delete it
        const deleteEntry = await userModel_journal.findByIdAndDelete(journalId);

        //res.status(200).json({ message: 'Journal entry delete successfully.' });
        res.redirect('/save-journal')

    }catch(error){
        console.error('Error deleting journal entry:', error);
        res.status(500).json({ message: 'An error occured while deleting the journal.' });
    }
});



app.listen(PORT, () => {
    console.log(`server is running in http://localhost:${PORT}`);
});
