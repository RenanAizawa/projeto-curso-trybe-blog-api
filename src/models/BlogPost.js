const PostsModel = (sequelize, DataTypes) => {
    const postsSchema = sequelize.define('BlogPost', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
    }, {
        timestamps: false,
        tableName: 'blog_posts',
        underscored: true,
    });
    postsSchema.associate = (models) => {
        postsSchema.belongsTo(models.User, {
            foreignKey: 'userId', as: 'user'
        });
    }
    return postsSchema;
}

module.exports = PostsModel;