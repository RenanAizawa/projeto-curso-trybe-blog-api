const { Sequelize } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
  const PostAndCatSchema = sequelize.define('Post_Categorie',
  {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  },
  {timestamps: false,
    underscored: true, 
    tableName: 'posts_categories'}
  )

  PostAndCatSchema.associate = (models) => {
    models.Posts.belongsTooMany(models.Categories, {
      as: 'posts',
      through: PostAndCatSchema,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.Categories.belongsTooMany(models.Posts, {
      as: 'categories',
      through: PostAndCatSchema,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    })
  };

  return PostAndCatSchema;
}