const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
  name: String,
  serialNumber: String,
  department: String,
  assignedEmployee: String,
  maintenanceTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },
  purchaseDate: Date,
  warrantyExpiry: Date,
  location: String,
  isScrapped: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Equipment", EquipmentSchema);
