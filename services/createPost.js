const decodeToken = require('../helpers/decodeToken');
const { BlogPosts, User, Categories } = require('../models');

module.exports = async (postInfo, authorization) => {
  const { data } = decodeToken(authorization);
  const { categoryIds } = postInfo;

  const searchCategories = categoryIds.map((id) => Categories.findOne({ where: { id } }));

  const categories = await Promise.all(searchCategories);
  
  if (categories.includes(null)) return false;

  const user = await User.findOne({ where: { email: data.email } });

  const create = BlogPosts.create({ ...postInfo, userId: user.id });

  return create;
};