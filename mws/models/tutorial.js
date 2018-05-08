var mongoose = require("mongoose");
var tutorialSchema = new mongoose.Schema({
  title: String,
  theme: String,
  excerpt: String
});

module.exports = mongoose.model("Tutorial", tutorialSchema);
