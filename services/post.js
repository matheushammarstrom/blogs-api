const decodeToken = require('../helpers/decodeToken');
const { BlogPosts, User, Categories, PostsCategories } = require('../models');

const createPost = async (postInfo, authorization) => {
  const { data } = decodeToken(authorization);
  const { categoryIds } = postInfo;

  const searchCategories = categoryIds.map((id) => Categories.findOne({ where: { id } }));

  const categories = await Promise.all(searchCategories);
  
  if (categories.includes(null)) return false;

  const user = await User.findOne({ where: { email: data.email } });

  const create = BlogPosts.create({ ...postInfo, userId: user.id });

  return create;
};

const getPosts = async () => {
  const postCategories = await PostsCategories.findAll({ });

  console.log(postCategories);
  const users = await BlogPosts.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }, 
    {
      model: Categories,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  return users;
};

module.exports = {
  createPost,
  getPosts,
};