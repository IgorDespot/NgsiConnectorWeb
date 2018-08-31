const request = require("request-promise");
const resp = require("../lib/responses/index");

const getAll = (req, res) => {
  request({
    method: "GET",
    uri: "https://localhost:3001/v1/entities",
    headers: {
      "Fiware-Service": req.body.fiwareService,
      "Fiware-ServicePath": req.body.req.body.fiwareServicePath,
      "X-Auth-Token": req.body.accessToken,
    },
    json: true,
  })
    .then((result) => {
      res.render("entitiy", {
        data: result,
        message: "TODO message",
      });
    })
    .catch((error) => {
      res.render("entities", {
        msg: error.error,
      });
    });
};

const getSingle = (req, res) => {
  request({
    method: "GET",
    uri: `https://localhost:3001/v1/entities/${ req.body.entityid }`,
    headers: {
      "Fiware-Service": req.body.fiwareService,
      "Fiware-ServicePath": req.body.req.body.fiwareServicePath,
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
        msg: resp.responses.errorResponse(error.message),
      });
    });
};

const getType = (req, res) => {
  request({
    method: "GET",
    uri: `https://localhost:3001/v1/entities/type/${ req.body.type }`,
    headers: {
      "Fiware-Service": req.body.fiwareService,
      "Fiware-ServicePath": req.body.req.body.fiwareServicePath,
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
        msg: resp.responses.errorResponse(error.message),
      });
    });
};

const postCreate = (req, res) => {
  request({
    method: "POST",
    uri: "https://localhost:3001/v1/entities/",
    headers: {
      "Fiware-Service": req.body.fiwareService,
      "Fiware-ServicePath": req.body.fiwareServicePath,
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
      if (JSON.parse(result).length === 3) {
        const attr = JSON.parse(result)[ 1 ];
        const fail = resp.responses.errors(JSON.parse(result)[ 2 ]);
        resp.responses.attributeFail(attr);
        const summ = resp.responses.summary(JSON.parse(result)[ 0 ]);
        res.render("success", {
          succ: summ, data: fail, att: attr,
        });
      } else {
        const fail = resp.responses.errors(JSON.parse(result)[ 1 ]);
        const summ = resp.responses.summary(JSON.parse(result)[ 0 ]);
        res.render("success", {
          succ: summ, data: fail,
        });
      }
    })
    .catch((error) => {
      res.render("upload", {
        msg: error.message,
      });
    });
};

const postUpdate = (req, res) => {
  request({
    method: "POST",
    uri: "https://localhost:3001/v1/entities/update",
    headers: {
      "Fiware-Service": req.body.fiwareService,
      "Fiware-ServicePath": req.body.fiwareServicePath,
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
      if (JSON.parse(result).length === 3) {
        const attr = JSON.parse(result)[ 1 ];
        const fail = result.responses.errors(JSON.parse(result)[ 2 ]);
        resp.responses.attributeFail(attr);
        const summ = result.responses.summary(JSON.parse(result)[ 0 ]);
        res.render("success", {
          succ: summ, data: fail, att: attr,
        });
      } else {
        const fail = result.responses.errors(JSON.parse(result)[ 1 ]);
        const summ = result.responses.summary(JSON.parse(result)[ 0 ]);
        res.render("success", {
          succ: summ, data: fail,
        });
      }
    })
    .catch((error) => {
      res.render("upload", {
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
