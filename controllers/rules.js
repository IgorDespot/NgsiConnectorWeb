const request = require("request-promise");
const resp = require("../lib/responses");

const getAll = (req, res) => {
  request({
    method: "GET",
    uri: "https://localhost:3001/v1/rules",
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
    uri: `https://localhost:3001/v1/rules/${ req.body.rule }`,
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
