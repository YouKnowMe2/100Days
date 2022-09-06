const express = require('express');

const db = require('./data/database');
const app = express();

const quoteRoutes = require('./routes/quotes.routes');

app.use('/quotes',quoteRoutes);

app.use(function (req, res,next){
   res.status(500).json({
       message: 'Somehting wrong',
   })
});

db.initDb().then(function (){
    app.listen(3000);
}).catch(function (error){
    console.log('COnnection to the database failed');
});
