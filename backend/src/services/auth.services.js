const syncUser = async (authPayload) => {
  return {
    auth0Id: authPayload.sub,
    email: authPayload.email
  };
};

module.exports = { syncUser };
