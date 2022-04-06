const authIG = InstaClient => {
    InstaClient.authBySessionId(process.env.IG_SESSION_ID)
      .then(account => console.log("logged in"))
      .catch(err => console.error(err));
  };
  
  module.exports = authIG;