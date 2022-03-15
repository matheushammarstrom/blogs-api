const { Categories } = require('../models');

module.exports = async () => {
  const categories = await Categories.findAll();

  return categories;
};