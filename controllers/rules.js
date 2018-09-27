const request = require("request-promise");
const resp = require("../lib/responses");
const config = require('../config.json')

const getAll = (req, res) => {
  request({
    method: "GET",
    uri: `${config.url}/rules`,
  })
    .then((result) => {
      res.render("rules", {
        rules: JSON.parse(result),
      });
    })
    .catch((error) => {
      res.render("rules", {
        msg: error,
      });
    });
};

const getSingle = (req, res) => {
  request({
    method: "GET",
    uri: `${config.url}/rules/${ req.body.rule }`,
  })
    .then((result) => {
      res.render("rules", {
        rules: resp.responses.summary(JSON.parse(result)),
      });
    })
    .catch((error) => {
      res.render("rules", {
        msg: error.error,
      });
    });
};

module.exports = {
  getAll,
  getSingle,
};
