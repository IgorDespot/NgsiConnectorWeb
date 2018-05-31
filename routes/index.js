const express = require('express');
const ngsiConnector = require('../lib/ngsi_connector');
const db = require('../db');
const requestPromise = require('request-promise');
const result = require('../lib/responses/');

const router = express.Router();

module.exports = (passport) => {
  router.get('/', db.users.findIfLoggedin, (req, res) => {
    res.render('home', {
      user: req.user
    });
  });

  router.get('/login', (req, res) => {
    res.render('login', {
      message: req.flash('error')
    });
  });

  router.post(
    '/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    (req, res) => {
      res.redirect('/');
    }
  );

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  router.post('/entities', db.users.findIfLoggedin, (req, res) => {
    if (!req.body.fiwareService) {
      res.render('entities', {
        msg: 'Please provide Fiware Service.'
      });
    } else if (!req.body.fiwareServicePath) {
      res.render('entities', {
        msg: 'Please provide Fiware Service Path.'
      });
    } else {
      ngsiConnector.entities.getAll(req, res, req.body.fiwareService, req.body.fiwareServicePath);
    }
  });

  router.post('/index', db.users.findIfLoggedin, (req, res) => {
    if (!req.body.fiwareService) {
      res.render('detailshome', {
        msg: 'Please provide Fiware Service.'
      });
    } else if (!req.body.fiwareServicePath) {
      res.render('detailshome', {
        msg: 'Please provide Fiware Service Path.'
      });
    } else {
      ngsiConnector.entities
        .getSingle(req.body.entityid, req.body.fiwareService, req.body.fiwareServicePath, req, res);
    }
  });

  router.post('/indextype', db.users.findIfLoggedin, (req, res) => {
    ngsiConnector.entities
      .getByType(req.body.entityid, req.body.fiwareService, req.body.fiwareServicePath, req, res);
  });

  router.get('/detailshome', db.users.findIfLoggedin, (req, res) => {
    res.render('detailshome');
  });

  router.get('/details', db.users.findIfLoggedin, (req, res) => {
    res.render('details');
  });

  router.get('/upload', db.users.findIfLoggedin, (req, res) => {
    res.render('upload');
  });

  router.get('/update', db.users.findIfLoggedin, (req, res) => {
    res.render('update');
  });

  router.get('/entitieshome', db.users.findIfLoggedin, (req, res) => {
    res.render('entities');
  });

  router.get('/typehome', db.users.findIfLoggedin, (req, res) => {
    res.render('typehome');
  });

  router.post('/upload', db.users.findIfLoggedin, (req, res) => {
    ngsiConnector.entities.upload(req, res, (err) => {
      if (!req.body.fiwareService) {
        res.render('upload', {
          msg: 'Please provide Fiware Service.'
        });
      } else if (!req.body.fiwareServicePath) {
        res.render('upload', {
          msg: 'Please provide Fiware Service Path.'
        });
      } else if (err) {
        res.render('upload', {
          msg: err
        });
      } else if (req.file === undefined) {
        res.render('upload', {
          msg: 'Please select file.'
        });
      } else {
        const options = {
          method: 'POST',
          uri: 'http://localhost:3000/api/entities/',
          headers: {
            Authorization: 'Basic emFtdWRpbzoxMjM=',
            'Fiware-Service': req.body.fiwareService,
            'Fiware-ServicePath': req.body.fiwareServicePath
          },
          formData: {
            file: {
              value: req.file.buffer,
              options: {
                filename: req.file.originalname,
                contentType: req.file.mimetype
              }
            }
          }
        };
        requestPromise(options)
          .then((body) => {
            if (JSON.parse(body).length === 3) {
              const attr = JSON.parse(body)[1];
              const fail = result.responses.errors(JSON.parse(body)[2]);
              result.responses.attributeFail(attr);
              const summ = result.responses.summary(JSON.parse(body)[0]);
              res.render('success', {
                succ: summ, data: fail, att: attr
              });
            } else {
              const fail = result.responses.errors(JSON.parse(body)[1]);
              const summ = result.responses.summary(JSON.parse(body)[0]);
              res.render('success', {
                succ: summ, data: fail
              });
            }
          })
          .catch((error) => {
            res.render('upload', {
              msg: error.message
            });
          });
      }
    });
  });

  router.post('/update', db.users.findIfLoggedin, (req, res) => {
    ngsiConnector.entities.upload(req, res, (err) => {
      if (!req.body.fiwareService) {
        res.render('upload', {
          msg: 'Please provide Fiware Service.'
        });
      } else if (!req.body.fiwareServicePath) {
        res.render('upload', {
          msg: 'Please provide Fiware Service Path.'
        });
      } else if (err) {
        res.render('upload', {
          msg: err
        });
      } else if (req.file === undefined) {
        res.render('upload', {
          msg: 'Please select file.'
        });
      } else {
        const options = {
          method: 'POST',
          uri: 'http://localhost:3000/api/entities/update',
          headers: {
            Authorization: 'Basic emFtdWRpbzoxMjM=',
            'Fiware-Service': req.body.fiwareService,
            'Fiware-ServicePath': req.body.fiwareServicePath
          },
          formData: {
            file: {
              value: req.file.buffer,
              options: {
                filename: req.file.originalname,
                contentType: req.file.mimetype
              }
            }
          }
        };
        requestPromise(options)
          .then((body) => {
            if (JSON.parse(body).length === 3) {
              const attr = JSON.parse(body)[1];
              const fail = result.responses.errors(JSON.parse(body)[2]);
              result.responses.attributeFail(attr);
              const summ = result.responses.summary(JSON.parse(body)[0]);
              res.render('success', {
                succ: summ, data: fail, att: attr
              });
            } else {
              const fail = result.responses.errors(JSON.parse(body)[1]);
              const summ = result.responses.summary(JSON.parse(body)[0]);
              res.render('success', {
                succ: summ, data: fail
              });
            }
          })
          .catch((error) => {
            res.render('upload', {
              msg: error.message
            });
          });
      }
    });
  });
  return router;
};
