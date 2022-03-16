const { BlogPosts, User, Categories, PostsCategories } = require('../models');

module.exports = async () => {
  const postCategories = await PostsCategories.findAll({ });

  console.log(postCategories);

  // const usersasdas = await BlogPosts.findAll({ include: [{ model: User, as: 'user' }, { model: PostsCategories, as: 'categories', through: { where: { completed: true } } }] });
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