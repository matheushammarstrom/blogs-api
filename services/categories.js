const { Categories } = require('../models');

const createCategory = async (name) => {
  const create = await Categories.create({ name });

  return create;
};

const getCategories = async () => {
  const categories = await Categories.findAll();

  return categories;
};

module.exports = {
  createCategory,
  getCategories,
};