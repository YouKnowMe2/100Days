//File Require
const express = require('express');
//End of File Require

//Importing Controllers
const authController = require("../controllers/auth.controllers");

//end of Controllers
const router = express.Router();

router.get('/signup',authController.getSignup);
router.post('/signup',authController.signup);

router.get('/login',authController.getLogin);

router.post('/login',authController.login);


module.exports = router;