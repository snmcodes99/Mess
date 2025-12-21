const { expressjwt: jwt } = require("express-jwt")
const jwks = require("jwks-rsa")
const auth0Config = require("../config/auth0")

const requireAuth = jwt({
  secret: jwks.expressJwtSecret({
    jwksUri: `https://${auth0Config.domain}/.well-known/jwks.json`
  }),
  audience: auth0Config.audience,
  issuer: auth0Config.issuer,
  algorithms: auth0Config.algorithms
})

module.exports = requireAuth
