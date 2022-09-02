//File Require
const express = require('express');
//End of File Require

//Importing Controllers
const cartController = require("../controllers/cart.controller");

//end of Controllers
const router = express.Router();

router.post('/items',cartController.addCartItem);
router.get('/',cartController.getCart);

module.exports = router;