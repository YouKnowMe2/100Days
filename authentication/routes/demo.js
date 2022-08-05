const express = require('express');

const db = require('../data/database');
const bcrypt = require('bcryptjs')

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  res.render('signup');
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/signup', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const confirmEmail = userData['confirm-email'];
  const enteredPassword = userData.password;

  if(!enteredPassword || !enteredEmail || !confirmEmail || enteredPassword.trim()<6 || enteredEmail !== confirmEmail){
    console.log('incorrect data');
          return res.redirect('/signup');
  }

  const existingUser = await
       db.getDb().collection('users').findOne({ email: enteredEmail });
  if(existingUser){
    console.log('email alreayd existi');
    return res.redirect('/signup');
  }
  const hashedPassword = await bcrypt.hash(enteredPassword,12);

  const user = {
    email: enteredEmail,
    password: hashedPassword,

  };
  await db.getDb().collection('users').insertOne(user);

  res.redirect('/login');
});

router.post('/login', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const exisitingUser = await db.getDb().collection('users').findOne({email: enteredEmail });

  if(!exisitingUser){
    console.log('could not log in');
    return res.redirect('/login');
  }
   const passwordEqual = await bcrypt.compare(enteredPassword, exisitingUser.password);

  if(!passwordEqual){
    console.log('could not log in password error');

    return res.redirect('/login');
  }
  console.log('User is authenticated');
  res.redirect('/admin');
});

router.get('/admin', function (req, res) {
  res.render('admin');
});

router.post('/logout', function (req, res) {});

module.exports = router;



