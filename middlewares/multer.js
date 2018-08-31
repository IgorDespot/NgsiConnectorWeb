const multer = require("multer");

exports.upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1000000 },
}).single("userFile");
