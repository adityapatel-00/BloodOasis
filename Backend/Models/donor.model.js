const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donorSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const Donor = mongoose.model("Donor", donorSchema);
module.exports = Donor;
