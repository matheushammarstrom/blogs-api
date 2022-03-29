const login = require('./login');
const { createUser, getUser, getUsers } = require('./user.js');
const { createCategory, getCategories } = require('./categories');
const { createPost, getPosts } = require('./post');

module.exports = {
  createUser,
  login,
  getUsers,
  getUser,
  createCategory,
  getCategories,
  createPost,
  getPosts,
};