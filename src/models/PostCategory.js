module.exports = (sequelize, DataTypes) => {
  const PostAndCatSchema = sequelize.define('PostCategory',
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
    },
  },
  {timestamps: false,
    underscored: true, 
    tableName: 'posts_categories',
  }
  )

  PostAndCatSchema.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostAndCatSchema,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostAndCatSchema,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    })
  };

  return PostAndCatSchema;
}