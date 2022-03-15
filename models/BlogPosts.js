const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pusblished: {
    type: DataTypes.DATE,
    field: 'createdAt',
  },
  uptaded: {
    type: DataTypes.DATE,
    field: 'updatedAt',
  },
};

module.exports = (sequelize) => {
  const BlogPosts = sequelize.define('BlogPosts', attributes, {
    tableName: 'BlogPosts', 
    timestamps: false,
    underscored: false,
  });

  BlogPosts.associate = (models) => {
    models.BlogPosts.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return BlogPosts;
};