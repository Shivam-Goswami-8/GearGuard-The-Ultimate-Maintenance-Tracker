const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  subject: String,
  type: {
    type: String,
    enum: ["Corrective", "Preventive"]
  },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment"
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },
  assignedTo: String,
  scheduledDate: Date,
  duration: Number,
  status: {
    type: String,
    enum: ["New", "In Progress", "Repaired", "Scrap"],
    default: "New"
  }
}, { timestamps: true });

module.exports = mongoose.model("Request", RequestSchema);
