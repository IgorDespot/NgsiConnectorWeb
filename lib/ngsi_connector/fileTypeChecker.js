const path = require('path');

module.exports = (file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext === '.csv') {
    return cb(null, true);
  }
  return cb('Error: csv Only');
};
