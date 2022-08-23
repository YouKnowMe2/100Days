const User = require('../models/user.model');
const authUtil = require('../util/authentication');
const userValid = require('../util/validation');
const sessionFlash = require('../util/session-flash');
function getSignup(req,res){
    let sessionData = sessionFlash.getSessionData(req);
    if(!sessionData){
        sessionData = {
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            street: '',
            postal: '',
            city: '',

        };
    }
    res.render('customer/auth/signup',{
        inputData: sessionData
    });
}

async function signup(req,res,next){
    const enteredData = {
            email: req.body.email,
            confirmEmail: req.body['confirm-email'],
            password: req.body.password,
            confirmPassword: req.body['confirm-password'],
            fullName: req.body.fullName,
            street: req.body.street,
            postal: req.body.postal,
            city: req.body.city

    };
    if(!userValid.userDetailAreValid(
            req.body.email,
            req.body.password,
            req.body.fullName,
            req.body.street,
            req.body.postal,
            req.body.city
    ) ||
        !userValid.emailPassIsConfirm(req.body.email, req.body['confirm-email'],req.body.password ,req.body['confirm-password'])
    ){
        sessionFlash.flashDataToSession(req,{
            errorMessage : 'Please Check Your Info password must be 6 letter long',
            ...enteredData

        },function (){
            res.redirect('/signup');
        })

        return;
    }

    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullName,
        req.body.street,
        req.body.postal,
        req.body.city
    );


    try {
        const existsAlready = await user.existsAlready();
        if(existsAlready){
            sessionFlash.flashDataToSession(req,{
                errorMessage : 'Email exists already',
                ...enteredData
            },function (){
                res.redirect('/signup');
            });

            return;
        }
        user.signup();
    }catch (error){
        next(error);
        return;
    }

    res.redirect('/login');
}

function getLogin(req,res){
    let sessionData = sessionFlash.getSessionData(req);
    if(!sessionData){
        sessionData = {
            email: '',
            password: ''
        };
    }
    res.render('customer/auth/login',{
        inputData: sessionData
    });
}

async function login(req,res,next){

    const enteredData = {
        email: req.body.email,
        password: req.body.password
    }
    const user = new User(req.body.email, req.body.password,null,null,null,null);
    let existingUser;
try{
    existingUser = await user.getUserwithSameEmail();
}catch (error){

    next(error);
    return;
}

    const sessionErrorData = {
        errorMessage: 'User doesn\'t not exist',
        ...enteredData
    }

    if(!existingUser){
        sessionFlash.flashDataToSession(req,sessionErrorData,function (){
            res.redirect('/login');
        })

        return;
    }
    const passwordIsCorrect = await user.comparePassword(existingUser.password);
    if(!passwordIsCorrect){
        sessionFlash.flashDataToSession(req,sessionErrorData,function (){
            res.redirect('/login');
        })
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