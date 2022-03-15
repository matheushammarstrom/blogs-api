const categorySchema = require('../schemas/categorySchema');
const services = require('../services');

module.exports = async (req, res, next) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }
    const categoryName = req.body.name;

    const create = await services.createCategory(categoryName);
    
    if (!create) return res.status(409).json({ message: 'User already registered' });

    return res.status(201).json({ ...create.dataValues });
  } catch (e) {
    console.log(e);
    next(e);
  }
};