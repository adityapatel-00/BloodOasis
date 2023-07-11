const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});

const feedB = mongoose.model("feedBack", feedbackSchema);
module.exports = feedB;
