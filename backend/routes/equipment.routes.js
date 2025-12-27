const express = require("express");
const Equipment = require("../models/Equipment");

const router = express.Router();

router.post("/", async (req, res) => {
  const equipment = new Equipment(req.body);
  await equipment.save();
  res.json(equipment);
});

router.get("/", async (req, res) => {
  const equipment = await Equipment.find().populate("maintenanceTeam");
  res.json(equipment);
});

module.exports = router;
