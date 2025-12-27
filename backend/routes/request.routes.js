const express = require("express");
const Request = require("../models/Request");
const Equipment = require("../models/Equipment");

const router = express.Router();

// CREATE REQUEST (AUTO-FILL TEAM)
router.post("/", async (req, res) => {
  const equipment = await Equipment.findById(req.body.equipment);

  const request = new Request({
    ...req.body,
    team: equipment.maintenanceTeam
  });

  await request.save();
  res.json(request);
});

// GET ALL REQUESTS
router.get("/", async (req, res) => {
  const requests = await Request.find()
    .populate("equipment")
    .populate("team");
  res.json(requests);
});

// UPDATE STATUS + SCRAP LOGIC
router.put("/:id", async (req, res) => {
  const request = await Request.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (req.body.status === "Scrap") {
    await Equipment.findByIdAndUpdate(request.equipment, {
      isScrapped: true
    });
  }

  res.json(request);
});

module.exports = router;
