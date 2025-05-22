const fs = require("fs");
const path = require("path");
const { VIDEOS_DIR, VIDEO_EXTENSIONS, PORT } = require("../config/paths");

const listVideos = (req, res) => {
  fs.readdir(VIDEOS_DIR, async (err, files) => {
    if (err) {
      return res.status(500).json({
        error: "Error leyendo la carpeta de videos",
        detalles: err.message,
      });
    }

    const videoFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return VIDEO_EXTENSIONS.includes(ext);
    });

    const videosInfo = await Promise.all(
      videoFiles.map(async (file) => {
        const filePath = path.join(VIDEOS_DIR, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          size: stats.size, // bytes
          sizeMB: (stats.size / (1024 * 1024)).toFixed(2) + " MB", // megabytes
          createdAt: stats.birthtime,
          modifiedAt: stats.mtime,
          url: `http://localhost:${PORT}/video/${encodeURIComponent(file)}`,
        };
      })
    );

    res.json({ videos: videosInfo });
  });
};

const serveVideo = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(VIDEOS_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Archivo no encontrado" });
  }

  res.sendFile(filePath);
};

module.exports = {
  listVideos,
  serveVideo,
};
