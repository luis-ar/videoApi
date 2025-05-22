const express = require("express");
const app = express();
const videoRoutes = require("./routes/videoRoutes");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/", videoRoutes);

module.exports = app;
