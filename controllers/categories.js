const categorySchema = require('../schemas/categorySchema');
const services = require('../services');
const getCategories = require('../services/getCategories');

const create = async (req, res, next) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }
    const categoryName = req.body.name;

    const createCategory = await services.createCategory(categoryName);
    
    if (!createCategory) return res.status(409).json({ message: 'User already registered' });

    return res.status(201).json({ ...createCategory.dataValues });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
   const categories = await getCategories();
 
   return res.status(200).json(categories);
 } catch (e) {
   console.log(e);
   next(e);
 }
};

module.exports = {
  createCategory: create,
  getCategories: getAll,
};