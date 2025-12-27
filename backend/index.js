const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const equipmentRoutes = require("./routes/equipment.routes");
const teamRoutes = require("./routes/team.routes");
const requestRoutes = require("./routes/request.routes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/equipment", equipmentRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/requests", requestRoutes);

app.get("/", (req, res) => {
  res.send("GearGuard Backend Running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
