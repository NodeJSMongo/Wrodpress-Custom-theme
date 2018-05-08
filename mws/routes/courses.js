var express= require("express");
var router = express.Router();
var Course = require("../models/course");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/courses", function(req, res){
  //retrieve all the courses and display those in the courses route
  Course.find({}, function(err, courses){
    if(err){
      res.send(err);
    }else{
      Comment.find({}, function(err,comments){
        if(err){
          res.send(err)
          }else{
            res.render("./courses/courses", {courses:courses, comments: comments});
          }
      });
    }
  });
});

//COURSES POST CREATE ROUTE
router.post("/course", middleware.isLoggedIn, function(req, res){
  //get data from form and push it to database or an array
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCourse = {name:name, image:image, description:description}
  //after getting the data then use mongoose to save data in the database.
  Course.create(newCourse, function(err, course){
    if(err){
      res.send("Data failed to add in the db");
    }else{
      course.author.id = req.user._id;
      course.author.username = req.user.username;
      course.save();
      res.redirect("/courses");
    }
  });
});

//COURSES NEW CREATE ROUTE

router.get("/course/new", middleware.isLoggedIn, function(req, res){
  res.render("./courses/new");
});

//COURSES SHOW ROUTE

router.get("/course/:id", function(req, res){
  var selectedCourse = req.params.id;
  Course.findById(selectedCourse, function(err, courseSelected){
    if(err){
      res.send(err);
    }else{
      res.render("./courses/show", {course: courseSelected});
    }
  });
});

//COURSES EDIT ROUTE

router.get("/course/:id/edit", middleware.authorizeTutor, function(req, res){
  Course.findById(req.params.id, function(err, courseEdited){
    if(err){
      res.send(err);
    }else{
      res.render("./courses/edit", {course: courseEdited});
    }
  });
});

// COURSES EDIT PUT ROUTE

router.put("/course/:id", middleware.authorizeTutor, function(req, res){
  Course.findByIdAndUpdate(req.params.id, req.body.course, function(err, updatedCourse){
    if(err){
      res.send(err);
    }else{
      res.redirect("/course/"+req.params.id);
    }
  });
});

//COURSES DELETE ROUTE

router.delete("/course/:id", middleware.authorizeTutor, function(req, res){
  Course.findByIdAndRemove(req.params.id, function(err, deletedCourse){
    if(err){
      res.send(err);
    }else{
      res.redirect("/courses");
    }
  });
});

module.exports = router;
