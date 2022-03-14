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
    PostsCategories.belongsToMany(models.Categories, { foreignKey: 'postId', 
      otherKey: 'categoryId', 
      through: PostsCategories, 
      as: 'categories', 
    });
    PostsCategories.belongsToMany(models.Categories, { foreignKey: 'categoryId', 
      otherKey: 'postId', 
      through: PostsCategories, 
      as: 'posts', 
    });
  };
  return PostsCategories;
};