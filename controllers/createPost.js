const postSchema = require('../schemas/postSchema');
const services = require('../services');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { error } = postSchema.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }
    const { title, content, categoryIds } = req.body;

    const postInfo = { title, content, categoryIds };

    const create = await services.createPost(postInfo, authorization);

    if (!create) return res.status(400).json({ message: '"categoryIds" not found' });

    return res.status(201).json(create);
  } catch (e) {
    console.log(e);
    next(e);
  }
};