var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        description: req.body.bio,
        profilepicture: req.body.Profilepicture
        
    });
    
   User.register(newUser, req.body.password, function(err, user){
     if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
          req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds"); 
        });
    });
});  



//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/campgrounds");
});

// User profiles route
router.get("/users/:id", function(req, res) {
    User.findById(req.params.id, function (err, foundUser){
        if(err){
            req.flash("error", "something went wrong");
            res.redirect("/");
        }
        res.render("users/show", {user: foundUser})
    })
});



//user edit route


router.get("/users/:id/edit",  function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        res.render("users/edit", {user: foundUser});
    });
});

// user update route

router.put("/users/:id", function(req, res){
    // find and update the correct user
    User.findByIdAndUpdate(req.params.id, req.body.User, function(err, updatedUser){
       if(err){
           res.redirect("/");
       } else {
           //redirect somewhere(show page)
           res.redirect("/users/" + req.params.id);
       }
    });
});





module.exports = router;