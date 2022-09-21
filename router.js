var express = require("express");
var router = express.Router();
const credential = {
    email:"admin@gmail.com",
    password:"ad1234"
}

//login user
router.post('/login',(req,res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password)
    {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        // res.end("Login Successfully");
        
    }else{
        res.end("Invalid User")
    }
})

//route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user)
    {
        res.render('dashboard',{user:req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error");
        }else{
            res.render('index',{title:"Express Project",logout:"Logout Successfully"})
        }
    })
})
module.exports = router;