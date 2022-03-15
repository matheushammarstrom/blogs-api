const { Categories } = require('../models');

module.exports = async (name) => {
  const create = await Categories.create({ name });

  return create;
};