const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '7d',
};

const SECRET = process.env.JWT_SECRET;

module.exports = (data = {}) => jwt.sign({ data }, SECRET, jwtConfig);
