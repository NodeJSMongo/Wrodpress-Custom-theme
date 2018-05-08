var express= require("express");
var router = express.Router();
var Comment = require("../models/comment");
var middleware = require("../middleware");

//WE DONT NEED A COMMENT INDEX ROUTE

//COMMENT CREATE ROUTE GOES HERE
router.post("/courses/comment", middleware.isLoggedIn, function(req, res){
  Comment.create(req.body.comment, function(err, comment){
    if(err){
      res.send(err);
    }else{
      comment.author.id = req.user._id;
      comment.author.username = req.user.username;
      comment.save();
      res.redirect("/courses");
    }
  });
});
//WE DON'T NEED A NEW COMMENT FORM ROUTE
//WE ARE USING THE COURSES PAGE INSTEAD

//COMMENT EDIT ROUTE
router.get("/courses/comment/:id/edit", middleware.authorizeCommentor, function(req,res){
  Comment.findById(req.params.id, function(err, comment){
    if(err){
      res.send(err);
    }else{
      res.render("./comments/edit", {comment:comment});
    }
  });
});

//COMMENT UPDATE ROUTE
router.put("/courses/comment/:id", middleware.authorizeCommentor, function(req, res){
  Comment.findByIdAndUpdate(req.params.id, req.body.comment, function(err, updatedComment){
    if(err){
      res.send(err)
    }else{
      res.redirect("/courses");
    }
  });
});

//COMMENT DELETE ROUTE
router.delete("/courses/comment/:id", middleware.authorizeCommentor, function(req,res){
  Comment.findByIdAndRemove(req.params.id, function(err, deletedComment){
    if(err){
      res.send(err);
    }else{
      res.redirect("/courses");
    }
  });
});

module.exports = router;
