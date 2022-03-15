const userSchema = require('../schemas/userSchema');
const services = require('../services');
const genToken = require('../helpers/generateToken');

module.exports = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }
    const { displayName, password, image, email } = req.body;

    const userInfo = { displayName, password, image, email };

    const create = await services.createUser(userInfo);
    
    if (!create) return res.status(409).json({ message: 'User already registered' });

    const token = genToken(userInfo);

    return res.status(201).json({ token });
  } catch (e) {
    console.log(e);
    next(e);
  }
};