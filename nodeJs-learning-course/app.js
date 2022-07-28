//requried libary
const path = require ('path');
const fs = require('fs');
//required third party packages
const express = require('express');
const uuid = require('uuid');
//required file
const resData = require('./utili/restaurant-data');

const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));



app.get('/',function (req,res){
    res.render('index');
});


app.get('/restaurants',function (req, res,){
    
    const storeRestaurants = resData.getStoredRestaurant();
    res.render('restaurants',{
        restaurants: storeRestaurants
    });
});

app.get('/restaurants/:id',function (req,res){
    const restaurantId = req.params.id;
    const storeRestaurants = resData.getStoredRestaurant();

   

    for(const restaurant of storeRestaurants){
        if(restaurant.id === restaurantId){
            return res.render('restaurants_detail',{
                restaurantId: restaurant
                    });
            
                }
            }
            //Error Handeling
        res.status(404).render('404');            

});

app.get('/about',function (req, res,){
    res.render('about');
});

app.get('/recommend',function (req, res,){
    res.render('recommend');
});

app.post('/recommend',function (req,res){
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const restaurants  = resData.getStoredRestaurant();

    restaurants.push(restaurant);

    resData.storeRestaurant(restaurants);

    res.redirect('/confirm');

});

app.get('/confirm',function (req, res,){
    res.render('confirm');
});

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