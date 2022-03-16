const { DataTypes } = require('sequelize');

const attributes = {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  categoryId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = (sequelize) => {
  const PostsCategories = sequelize.define('PostsCategories', attributes, {
    tableName: 'PostsCategories', 
    timestamps: false,
  });
  PostsCategories.associate = (models) => {
    models.Categories.belongsToMany(models.BlogPosts, { foreignKey: 'postId', 
      otherKey: 'categoryId', 
      through: PostsCategories, 
      as: 'posts', 
    });
    models.BlogPosts.belongsToMany(models.Categories, { foreignKey: 'categoryId', 
      otherKey: 'postId', 
      through: PostsCategories, 
      as: 'categories', 
    });
  };
  return PostsCategories;
};