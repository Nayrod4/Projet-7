const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'sergsrg2454qzefqQSFsg0qef5FG';

// Exported functions
module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData.id,
      isAdmin: userData.isAdmin
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '1h'
    })
  },
  parseAuthorization: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: function(authorization) {
    let userId = -1;
    const token = module.exports.parseAuthorization(authorization);
    console.log(token);
    if(token != null) {
      try {
        const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        console.log(typeof jwtToken);
        if(jwtToken != null)
          userId = jwtToken.userId;
      } catch(err) {console.log(err); }
    }
    return userId;
  }
}