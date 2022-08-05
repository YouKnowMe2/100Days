const express = require('express');
const multer = require('multer');

const db = require('../data/database')
const storageConfigh = multer.diskStorage({
    destination: function (req,res,cb){
        cb(null, 'storage/images');
    },
    filename: function (req,file,cb){
        cb(null,Date.now()+ '-' + file.originalname);
    }
})
const upload = multer({ storage: storageConfigh });

const router = express.Router();


router.get('/', function(req, res) {
  res.render('profiles');
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});
router.post('/profiles',upload.single('image'), async function (req,res){
 const uploadImageFile = req.file;

 const userData = req.body;
 await db.getDb().collection('users').insertOne({
     name: userData.username,
     imagePath: uploadImageFile.path,
 });
 res.redirect('/');
});

module.exports = router;