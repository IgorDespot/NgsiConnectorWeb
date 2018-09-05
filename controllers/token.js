const request = require("request-promise");
const { clientID, clientSecret } = require("../config.json");

const getToken = (req, res, page) => {
  request({
    method: "POST",
    uri: "http://localhost:8000/oauth2/token",
    headers: {
      "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${ Buffer.from(`${ clientID }:${ clientSecret }`, "utf8").toString("base64") }`,
    },
    body: `grant_type=password&username=${ req.body.username }&password=${ req.body.password }&client_id=${ clientID }&client_secret=${ clientSecret }`,
  })
    .then((result) => {
      const parse = JSON.parse(result);
      res.render(page, {
        token: parse.access_token,
        data: `/deusto/w4t/${ req.user.username }/real`,
      });
    })
    .catch((error) => {
      res.render(page, {
        msg: error,
      });
    });
};

module.exports = {
  getToken,
};
