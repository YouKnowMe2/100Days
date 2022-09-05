const express = require('express');

const app = express();

app.use('/quote',function (req,res,next){
    res.json({
        quote: 'THis is not working',
    });
});


app.listen(3000);