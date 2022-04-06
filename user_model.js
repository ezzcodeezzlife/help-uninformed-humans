const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  thumbnailurl: String,
  score: String,
  url: String,
  hashtag: String,
  notified: String,
  shortcode: String,
});
module.exports = mongoose.model("Foundusers", entrySchema);
