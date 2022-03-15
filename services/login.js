const { User } = require('../models');
const genToken = require('../helpers/generateToken');

module.exports = async (userInfo) => {
  const { email, password } = userInfo;

  const userExists = await User.findOne({ where: { email } });

  if (!userExists || userExists.password !== password) return null;

  const token = genToken(userInfo);
  
  return token;
};