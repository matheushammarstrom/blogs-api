const getUser = require('../services/getUser');

module.exports = async (req, res, next) => {
   try {
    const { id } = req.params;
  
    const user = await getUser(id);
  
    if (!user) return res.status(404).json({ message: 'User does not exist' });
  
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    next(e);
  }
};