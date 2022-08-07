const express = require('express');

const db = require('../data/database');
const bcrypt = require('bcryptjs')

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  let sessionInput = req.session.inputData;
  if(!sessionInput){
    sessionInput ={
      hasError: false,
      email: '',
      confirmEmail: '',
      password: ''
    }
  }
  req.session.inputData = null;
  res.render('signup',{
    inputData: sessionInput
  });
});

router.get('/login', function (req, res) {
  let sessionInput = req.session.inputData;
  if(!sessionInput){
    sessionInput = {
      hasError: false,
      email: '',
      password: ''
    };
    req.session.inputData =  null;
  }
  res.render('login', {
    inputData: sessionInput
  });
});

router.post('/signup', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const confirmEmail = userData['confirm-email'];
  const enteredPassword = userData.password;

  if(!enteredPassword || !enteredEmail || !confirmEmail || enteredPassword.trim()<6 || enteredEmail !== confirmEmail || !enteredEmail.includes('@')){
    req.session.inputData = {
      hasError: true,
      message: 'Message Error',
      email: enteredEmail,
      confirmEmail: confirmEmail,
      password: enteredPassword
    };
    req.session.save(function (){
       res.redirect('/signup');
    });
    return ;

  }

  const existingUser = await
       db.getDb().collection('users').findOne({ email: enteredEmail });
  if(existingUser){
    req.session.inputData = {
      hasError: true,
      message: 'User exists already',
      email: enteredEmail,
      confirmEmail: confirmEmail,
      password: enteredPassword,
    }
    req.session.save(function (){
      return res.redirect('/signup');
    });
    return;
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

  const exisitingUser = await db
      .getDb()
      .collection('users')
      .findOne({email: enteredEmail });

  if(!exisitingUser){
    req.session.inputData = {
      hasError: true,
      message: 'Could not log you In',
      email: enteredEmail,
      password: enteredPassword
    };
    req.session.save(function (){
       res.redirect('/login');
    });
    return;

  }
   const passwordEqual = await bcrypt
       .compare(enteredPassword, exisitingUser.password);

  if(!passwordEqual){
    req.session.inputData = {
      hasError: true,
      message: 'Message Error',
      email: enteredEmail,
      password: enteredPassword,
    };

    req.session.save(function (){
      res.redirect('/login');
    });
    return;
  }

  req.session.user = { id: exisitingUser._id , email: exisitingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function (){
    res.redirect('/profile');
  });

});

router.get('/admin', function (req, res) {
  if(!res.locals.isAuth){
    return res.status(401).render('401');
  }
  if(!res.locals.isAdmin){
    return res.status(403).render('403');
  }
  res.render('admin');
});

router.get('/profile', function (req, res) {
  if(!res.locals.isAuth){
    return res.status(401).render('401');
  }
  res.render('profile');
});
router.post('/logout', function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect('/login');
});

module.exports = router;



