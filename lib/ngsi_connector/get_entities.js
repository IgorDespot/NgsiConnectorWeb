const requestPromise = require('request-promise');
const config = require('../../config.json');
const multer = require('multer');
const fileTypeCheck = require('./fileTypeChecker');

exports.getAll = (req, res, service, servicePath) => {
  const options = {
    uri: config.url,
    headers: {
      Authorization: 'Basic emFtdWRpbzoxMjM=',
      'Fiware-Service': service,
      'Fiware-ServicePath': servicePath
    },
    insecure: true,
    json: true
  };

  requestPromise(options)
    .then((entities) => {
      res.render('entity', {
        data: entities,
        message: 'TOOD message'
      });
    })
    .catch((error) => {
      res.render('error', {
        message: error.message
      });
    });
};

exports.getSingle = (id, service, servicePath, req, res) => {
  const options = {
    uri: config.url + id,
    headers: {
      Authorization: 'Basic emFtdWRpbzoxMjM=',
      'Fiware-Service': service,
      'Fiware-ServicePath': servicePath
    },
    json: true
  };

  requestPromise(options)
    .then((entity) => {
      res.render('details', {
        data: entity
      });
    })
    .catch((error) => {
      res.render('detailshome', {
        msg: error.message
      });
    });
};

exports.upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    fileTypeCheck(file, cb);
  }
}).single('userFile');
