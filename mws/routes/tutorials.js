var express= require("express");
var router = express.Router();
var Course = require("../models/course");
var Tutorial = require("../models/tutorial");

//GET ALL TUTORIALS ROUTE
router.get("/course/:id/tutorials", function(req,res){
  var courseid = req.params.id;
  Course.findById(courseid, function(err, courseFound){
    if(err){
      res.send(err);
    }else{
      Tutorial.find({},function(err, tutorials){
        if(err){
          res.send(err);
        }else{
          res.render("./tutorials/index", {course:courseFound, tutorials:tutorials});
        }
      });
    }
  });
});

//CREATE A NEW TUTOTIAL ROUTE

router.post("/course/:id/tutorial", function(req, res){
  Course.findById(req.params.id, function(err, courseClicked){
    if(err){
      res.send(err);
    }else{
      Tutorial.create(req.body.tutorial, function(err, newTutorial){
        if(err){
          res.send(err);
        }else{
          //associate this data of the tutorial to the course
          courseClicked.tutorials.push(newTutorial);
          courseClicked.save();
          res.redirect("/course/"+ req.params.id +"/tutorials");
        }
      });
    }
  });
});

//DISPLAY A NEW TUTORIAL FORM
router.get("/course/:id/tutorial/new", function(req, res){
  Course.findById(req.params.id, function(err, course){
    if(err){
      res.send(err);
    }else{
      res.render("./tutorials/new", {course:course});
    }
  });
});
//WE ARE NOT MAKING ANY SHOW ROUTE FOR TUTORIAL
//EDIT TUTORIAL ROUTE
router.get("/course/:id/tutorials/:tutorial_id/edit", function(req, res){
  var courseid = req.params.id;
  Tutorial.findById(req.params.tutorial_id, function(err, tutorialEdit){
    if(err){
      res.send(err);
    }else{
      res.render("./tutorials/edit", {courseid:courseid,tutorial:tutorialEdit});
    }
  });
});

//UPDATE TUTORIAL ROUTE
router.put("/course/:id/tutorials/:tutorial_id", function(req, res){
  Tutorial.findByIdAndUpdate(req.params.tutorial_id, req.body.tutorial, function(err, tutorial){
    if(err){
      res.send(err);
    }else{
      res.redirect("/course/"+ req.params.id +"/tutorials");
    }
  });
});
//DELETE TUTORIAL ROUTE

router.delete("/course/:id/tutorials/:tutorial_id",function(req, res){
  Tutorial.findByIdAndRemove(req.params.tutorial_id, function(err, tutorial){
    if(err){
      res.send(err);
    }else{
      res.redirect("/course/"+req.params.id +"/tutorials");
    }
  });
});
module.exports = router;
