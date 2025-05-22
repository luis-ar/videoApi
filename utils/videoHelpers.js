const path = require("path");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");

const getVideoDuration = (filePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return reject(err);
      const seconds = metadata.format.duration || 0;
      resolve(Math.floor(seconds * 1000)); // duración en milisegundos
    });
  });
};

const generatePreview = (inputPath, outputDir) => {
  const filename = path.parse(inputPath).name;
  const outputPath = path.join(outputDir, `${filename}.jpg`);

  return new Promise((resolve, reject) => {
    if (fs.existsSync(outputPath)) return resolve(outputPath);

    ffmpeg(inputPath)
      .screenshots({
        timestamps: ["1"],
        filename: `${filename}.jpg`,
        folder: outputDir,
        size: "320x240",
      })
      .on("end", () => resolve(outputPath))
      .on("error", (err) => reject(err));
  });
};

module.exports = {
  getVideoDuration,
  generatePreview,
};
