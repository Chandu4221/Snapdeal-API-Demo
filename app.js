var express = require('express');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 3000;

var index = require('./routes/index');
var categories = require('./routes/categories');


app.use(express.static(path.join(__dirname,'public')));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use('/',index);
app.use('/categories',categories);


app.use('*',function (err, req, res, next) {
  res.render('error');
})


app.listen(PORT,function(){
    console.log("Server Started at "+PORT);
});

