var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var session = require('express-session');
const {v4:uuidv4} = require('uuid');
const router = require('./router');
var app = express();

//get form data
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

//view file call
app.set('view engine','ejs');

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

//session
app.use(session({
    secret:'uuidv4',
    resave:false,
    saveUninitialized:true
}));

//router
app.use('/route',router);

//home route
app.get('/',function(req,res){
    res.render('index',{title:"Node Project"});
})

app.get('/about',function(req,res){
    res.render('about');
})

app.listen(8080);
console.log('server is start at port 8080');