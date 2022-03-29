const generateToken = require('../helpers/generateToken');
const userSchema = require('../schemas/userSchema');
const services = require('../services');

const getUser = async (req, res, next) => {
   try {
    const { id } = req.params;
  
    const user = await services.getUser(id);
  
    if (!user) return res.status(404).json({ message: 'User does not exist' });
  
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await services.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
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

    const token = generateToken(userInfo);

    return res.status(201).json({ token });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
};