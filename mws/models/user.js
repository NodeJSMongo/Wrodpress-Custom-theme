var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
    username:String,
    password:String
});

//this gives extra functionality to our user model
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
