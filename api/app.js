const express = require('express');

const db = require('./data/database');
const app = express();
const enableCors = require('./middlewares/cors');
app.use(express.json());

app.use(enableCors);
const quoteRoutes = require('./routes/quotes.routes');
const todosRoutes = require('./routes/todos.routes');



app.use('/quotes',quoteRoutes);
app.use('/todos',todosRoutes);

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
