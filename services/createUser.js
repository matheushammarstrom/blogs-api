const { User } = require('../models');

module.exports = async (userInfo) => {
  const { email } = userInfo;

  const userExists = await User.findOne({ where: { email } });

  if (userExists) return null;

  const newUser = await User.create(userInfo); 

  return newUser;
};