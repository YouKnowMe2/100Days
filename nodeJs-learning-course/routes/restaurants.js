const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require ('path');
const uuid = require('uuid');
const resData = require('../utili/restaurant-data');

router.get('/restaurants',function (req, res,){
    const order = req.query.order;
    let nextOrder = 'desc';
    const storeRestaurants = resData.getStoredRestaurant();

  
    if(order != 'asc' && order != 'desc'){
        order = 'asc';
    }
    if(order === 'desc'){
        nextOrder = 'asc';
    }
    storeRestaurants.sort(function(resA,resB){
        if( (order === 'asc' && resA.name > resB.name) || (order === 'desc' && resB.name > resA.name) )
        {
            return 1
        }
        return -1
    });

    res.render('restaurants',{
        restaurants: storeRestaurants,
        nextOrder: nextOrder
    });
});

router.get('/restaurants/:id',function (req,res){
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

router.get('/recommend',function (req, res,){
    res.render('recommend');
});

router.post('/recommend',function (req,res){
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const restaurants  = resData.getStoredRestaurant();

    restaurants.push(restaurant);

    resData.storeRestaurant(restaurants);

    res.redirect('/confirm');

});

router.get('/confirm',function (req, res,){
    res.render('confirm');
});

module.exports = router;