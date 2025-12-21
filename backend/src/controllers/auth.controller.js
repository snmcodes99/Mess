const authService = require("../services/auth.services")

const me = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const user = await authService.syncUser(req.auth, token);

  res.json({
    message: "Authenticated",
    user
  });
};


module.exports = {
  me
}
