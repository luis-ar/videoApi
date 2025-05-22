const express = require("express");
const router = express.Router();
const { listVideos, serveVideo } = require("../controllers/videoController");

router.get("/videos", listVideos);
router.get("/video/:filename", serveVideo);

module.exports = router;
