const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'..','data', 'restaurants.json');

function getStoredRestaurant(){
    const fileData = fs.readFileSync(filePath);
    const storeRestaurants = JSON.parse(fileData);

    return storeRestaurants;
}

function storeRestaurant(storableRestaurants){

    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

module.exports = {
    getStoredRestaurant: getStoredRestaurant,
    storeRestaurant: storeRestaurant
};