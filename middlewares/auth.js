const { jwtSecret } = require("../config/config");
const { expressjwt } = require("express-jwt");

//Bearer <JWT>
function getTokenFromHeader(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] == "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
}

const auth = {
  required: function (req, res, next) {
    if (!req.auth || !req.auth.email) {
      return res.sendStatus(401);
    }
    next();
  },
  isUser: function (req, res, next) {
    if (!req.auth || !req.auth.email) {
      return res.sendStatus(401);
    }
    console.log(req.auth.type !== "admin");
    if (!req.auth.type == "user" || !req.auth.type == "admin") {
      return res.sendStatus(403);
    }
    next();
  },

  isAdmin: function (req, res, next) {
    if (!req.auth || !req.auth.email) {
      return res.sendStatus(401);
    }
    if (req.auth.type !== "admin") {
      return res.sendStatus(403);
    }
    next();
  },
  optional: expressjwt({
    secret: jwtSecret,
    algorithms: ["HS256"],
    userProperty: "usuario",
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
};

module.exports = auth;
