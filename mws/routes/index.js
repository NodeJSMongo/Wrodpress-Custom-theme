var express= require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
  res.render("index");
});

//USER LOGIN ROUTE
router.get("/login", function(req, res){
  res.render("./users/login");
});

router.post("/login", passport.authenticate("local",
  {
    successRedirect:"/courses",
    failureRedirect:"/login"
  }), function(req, res){
});
//USER REGISTER ROUTE
router.get("/register", function(req, res){
  res.render("./users/register");
});
//USER LOGIN / NEW USER REGISTER ROUTE
router.post("/register", function(req, res){
  var newUser = new User({username:req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.redirect("back");
    }else{
      passport.authenticate("local")(req, res, function(){
        req.flash("success", "Welcome "+ user.username + " to ModernWebStack.com !");
        res.redirect("/courses");
      });
    }
  });
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "You are successfully logged out.");
  res.redirect("/courses");
});

module.exports = router;
