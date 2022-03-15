const services = require('../services');

module.exports = async (req, res, next) => {
  try {
    const users = await services.getUsers();

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};