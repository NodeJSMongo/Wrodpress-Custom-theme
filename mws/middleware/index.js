var middlewareObj ={};

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "Please login.");
  res.redirect("/login");
}

middlewareObj.authorizeCommentor = function(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.id, function(err, comment){
      if(err){
        req.flash("error", "permission denied!");
        res.redirect("back");
      }else{
        if(comment.author.id.equals(req.user._id)){
          next();
        }else{
          req.flash("error", "permission denied!");
        }
      }
    });
  }else{
    req.flash("error", "permission denied!");
    res.redirect("back");
  }
}

middlewareObj.authorizeTutor = function(req, res, next){
  if(req.isAuthenticated()){
    Course.findById(req.params.id, function(err, course){
      if(err){
        req.flash("error", "permission denied!");
        res.redirect("back");
      }else{
        if(course.author.id.equals(req.user._id)){
          next();
        }else{
          req.flash("error", "permission denied!");
        }
      }
    });
  }else{
    res.redirect("back");
  }
}

module.exports = middlewareObj;
