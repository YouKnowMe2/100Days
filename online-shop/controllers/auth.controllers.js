const User = require('../models/user.model');
const authUtil = require('../util/authentication');

function getSignup(req,res){
    res.render('customer/auth/signup');
}

async function signup(req,res,next){
    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullName,
        req.body.street,
        req.body.postal,
        req.body.city);

    try {
        await user.signup();
    }catch (error){
        next(error);
        return;
    }

    res.redirect('/login');
}

function getLogin(req,res){
    res.render('customer/auth/login');
}

async function login(req,res,next){

    const user = new User(req.body.email, req.body.password,null,null,null,null);
    let existingUser;
try{
    existingUser = await user.getUserwithSameEmail();
}catch (error){

    next(error);
    return;
}


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