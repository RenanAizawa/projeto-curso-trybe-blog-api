module.exports = (sequelize, _DataTypes) => {
  const PostAndCatSchema = sequelize.define('Post_Categorie',
  {},
  {timestamps: false,
    underscored: true, 
    tableName: 'postsCategories'}
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