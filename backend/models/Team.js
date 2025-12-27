const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  teamName: String,
  members: [String] // technician names
});

module.exports = mongoose.model("Team", TeamSchema);
