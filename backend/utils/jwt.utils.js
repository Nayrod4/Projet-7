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
    }