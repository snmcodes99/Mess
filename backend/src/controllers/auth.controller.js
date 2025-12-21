const authService = require("../services/auth.services")

const me = async (req, res) => {
  const user = await authService.syncUser(req.auth)

  res.json({
    message: "Authenticated",
    user
  })
}

module.exports = {
  me
}
