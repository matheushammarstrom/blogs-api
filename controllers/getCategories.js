const getCategories = require('../services/getCategories');

module.exports = async (req, res, next) => {
   try {
    const categories = await getCategories();
  
    return res.status(200).json(categories);
  } catch (e) {
    console.log(e);
    next(e);
  }
};