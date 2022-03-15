const services = require('../services');
const loginSchema = require('../schemas/loginSchema');

module.exports = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      let [, message] = error.message.split('|');
      if (!message) message = error.message;
      return res.status(400).json({ message });
    }
    const { email, password } = req.body;

    const token = await services.login({ email, password });

    if (!token) return res.status(400).json({ message: 'Invalid fields' });

    return res.status(200).json({ token });
  } catch (e) {
    console.log(e);
    next(e);
  }
};