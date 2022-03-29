const postSchema = require('../schemas/postSchema');
const services = require('../services');

const create = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { error } = postSchema.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }
    const { title, content, categoryIds } = req.body;

    const postInfo = { title, content, categoryIds };

    const createPost = await services.createPost(postInfo, authorization);

    if (!createPost) return res.status(400).json({ message: '"categoryIds" not found' });

    return res.status(201).json(createPost);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const posts = await services.getPosts();

    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost: create,
  getPosts: getAll,
};