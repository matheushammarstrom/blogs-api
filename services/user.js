const { User } = require('../models');

const createUser = async (userInfo) => {
  const { email } = userInfo;

  const userExists = await User.findOne({ where: { email } });

  if (userExists) return null;

  const newUser = await User.create(userInfo); 

  return newUser;
};

const getUser = async (id) => {
  const user = await User.findOne({ where: { id } });

  return user;
};

const getUsers = async () => {
  const users = await User.findAll();

  return users;
};

module.exports = {
  createUser,
  getUser,
  getUsers,
};