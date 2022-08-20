//File Require
const express = require('express');
//End of File Require

//Importing Controllers
const authController = require("../controllers/auth.controllers");

//end of Controllers
const router = express.Router();

router.get('/signup',authController.getSignup);
router.get('/login',authController.getLogin);


module.exports = router;