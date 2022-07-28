//requried libary
const path = require ('path');
//required third party packages
const express = require('express');
//required file

const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));



app.use('/',defaultRoutes);
app.use('/',restaurantRoutes);

//404 handeling for routes
app.use(function(req,res){
    res.status(404).render('404');
});
//Server Side Error Handeling
app.use(function(error,req,res,next){
    if(error){
        res.status(500).render('500');
    }
    

});

app.listen(3000);