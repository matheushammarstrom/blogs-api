const services = require('../services');

module.exports = async (req, res, next) => {
  try {
    const posts = await services.getPosts();

    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};