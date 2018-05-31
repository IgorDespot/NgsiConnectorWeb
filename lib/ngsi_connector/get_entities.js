const requestPromise = require('request-promise');
const config = require('../../config.json');
const multer = require('multer');
const fileTypeCheck = require('./fileTypeChecker');
const result = require('../responses/index');

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
      res.render('entities', {
        msg: error.message
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
        msg: result.responses.errorResponse(error.message)
      });
    });
};

exports.getByType = (type, service, servicePath, req, res) => {
  const options = {
    uri: config.urlType + type,
    headers: {
      Authorization: 'Basic emFtdWRpbzoxMjM=',
      'Fiware-Service': service,
      'Fiware-ServicePath': servicePath
    },
    json: true
  };

  requestPromise(options)
    .then((types) => {
      res.render('entity', {
        data: types,
        message: 'TOOD message'
      });
    })
    .catch((error) => {
      res.render('typehome', {
        msg: result.responses.errorResponse(error.message)
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
