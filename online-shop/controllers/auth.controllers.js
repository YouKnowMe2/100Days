const User = require('../models/user.model');
const authUtil = require('../util/authentication');

function getSignup(req,res){
    res.render('customer/auth/signup');
}

async function signup(req,res){
    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullName,
        req.body.street,
        req.body.postal,
        req.body.city);

    await user.signup();
    res.redirect('/login');
}

function getLogin(req,res){
    res.render('customer/auth/login');
}

async function login(req,res){

    const user = new User(req.body.email, req.body.password,null,null,null,null);


    const existingUser = await user.getUserwithSameEmail();
    if(!existingUser){
        res.redirect('/login');
        return;
    }
    const passwordIsCorrect = await user.comparePassword(existingUser.password);
    if(!passwordIsCorrect){
        res.redirect('/login');
        return;
    }

    authUtil.createUserSession(req,existingUser,function (){
        res.redirect('/');
    });

}

function logout(req,res){
  authUtil.destroyUserAuthSession(req);
  res.redirect('/login');
}

module.exports = {
    getSignup: getSignup,
    signup: signup,
    getLogin: getLogin,
    login: login,
    logout: logout,
}