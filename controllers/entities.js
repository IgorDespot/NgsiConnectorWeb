const request = require("request-promise");
const resp = require("../lib/responses/index");
const { response } = require("../utilis");
const config = require('../config.json')

const getAll = (req, res) => {
  request({
    method: "GET",
    uri: `${config.url}/entities/`,
    headers: {
      "Fiware-Service": req.body.fiwareService,
      "Fiware-ServicePath": req.body.fiwareServicePath,
      "X-Auth-Token": req.body.accessToken,
    },
    json: true,
  })
    .then((result) => {
      res.render("entity", {
        data: result,
        message: "TODO message",
      });
    })
    .catch((error) => {
      res.render("entities", {
        data: `/deusto/w4t/${ req.user.username }/real`,
        msg: error.error,
      });
    });
};

const getSingle = (req, res) => {
  request({
    method: "GET",
    uri: `${config.url}/entities/${ req.body.entityid }`,
    headers: {
      "Fiware-Service": req.body.fiwareService,
      "Fiware-ServicePath": req.body.fiwareServicePath,
      "X-Auth-Token": req.body.accessToken,
    },
    json: true,
  })
    .then((result) => {
      res.render("details", {
        data: result[ 0 ],
      });
    })
    .catch((error) => {
      res.render("detailshome", {
        data: `/deusto/w4t/${ req.user.username }/real`,
        msg: resp.responses.errorResponse(error.message),
      });
    });
};

const getType = (req, res) => {
  request({
    method: "GET",
    uri: `${config.url}/entities/type/${ req.body.type }`,
    headers: {
      "Fiware-Service": req.body.fiwareService,
      "Fiware-ServicePath": req.body.fiwareServicePath,
      "X-Auth-Token": req.body.accessToken,
    },
    json: true,
  })
    .then((result) => {
      res.render("entity", {
        data: result,
        message: "TODO message",
      });
    })
    .catch((error) => {
      res.render("typehome", {
        data: `/deusto/w4t/${ req.user.username }/real`,
        msg: resp.responses.errorResponse(error.message),
      });
    });
};

const postCreate = (req, res) => {
  request({
    method: "POST",
    uri: `${config.url}/entities/`,
    headers: {
      "Fiware-Service": req.body.fiwareServiceUpload,
      "Fiware-ServicePath": req.body.fiwareServicePathUpload,
      "X-Auth-Token": req.body.accessToken,
    },
    formData: {
      file: {
        value: req.file.buffer,
        options: {
          filename: req.file.originalname,
          contentType: req.file.mimetype,
        },
      },
    },
  })
    .then((result) => {
      if (JSON.parse(result)[1].length !== 0) {
        const attr = JSON.parse(result)[ 1 ];
        const fail = resp.responses.errors(JSON.parse(result)[ 2 ]);
        const summ = resp.responses.summary(JSON.parse(result)[ 0 ]);
        res.render("success", {
          succ: summ, data: fail, att: attr,
        });
      } else {
        const fail = resp.responses.errors(JSON.parse(result)[ 2 ]);
        const summ = resp.responses.summary(JSON.parse(result)[ 0 ]);
        res.render("success", {
          succ: summ, data: fail,
        });
      }
    })
    .catch((error) => {
      res.render("upload", {
        data: `/deusto/w4t/${ req.user.username }/real`,
        msg: error.message,
      });
    });
};

const postUpdate = (req, res) => {
  request({
    method: "POST",
    uri: `${config.url}/entities/update`,
    headers: {
      "Fiware-Service": req.body.fiwareServiceUpload,
      "Fiware-ServicePath": req.body.fiwareServicePathUpload,
      "X-Auth-Token": req.body.accessToken,
    },
    formData: {
      file: {
        value: req.file.buffer,
        options: {
          filename: req.file.originalname,
          contentType: req.file.mimetype,
        },
      },
    },
  })
    .then((result) => {
      if (JSON.parse(result)[1].length !== 0) {
        const attr = JSON.parse(result)[ 1 ];
        const fail = resp.responses.errors(JSON.parse(result)[ 2 ]);
        const summ = resp.responses.summary(JSON.parse(result)[ 0 ]);
        res.render("success", {
          succ: summ, data: fail, att: attr,
        });
      } else {
        const fail = resp.responses.errors(JSON.parse(result)[ 2 ]);
        const summ = resp.responses.summary(JSON.parse(result)[ 0 ]);
        res.render("success", {
          succ: summ, data: fail,
        });
      }
    })
    .catch((error) => {
      res.render("upload", {
        data: `/deusto/w4t/${ req.user.username }/real`,
        msg: error.message,
      });
    });
};

module.exports = {
  getAll,
  getSingle,
  getType,
  postCreate,
  postUpdate,
};
