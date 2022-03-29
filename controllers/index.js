const login = require('./login');
const { getUser, getUsers, createUser } = require('./user');
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