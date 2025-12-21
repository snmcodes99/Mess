const axios = require("axios");
const User = require("../models/user.model");

async function syncUser(authPayload, token) {
  const auth0Id = authPayload.sub;

  // fetch full profile from Auth0
  const userInfo = await axios.get(
    `https://${process.env.AUTH0_DOMAIN}/userinfo`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );

  const { email, name, picture, email_verified } = userInfo.data;

  let user = await User.findOne({ auth0Id });

  if (!user) {
    user = await User.create({
      auth0Id,
      email,
      name,
      picture,
      email_verified,
      lastLogin: new Date()
    });
  } else {
    user.lastLogin = new Date();
    await user.save();
  }

  return user;
}

module.exports = {
  syncUser,
};
