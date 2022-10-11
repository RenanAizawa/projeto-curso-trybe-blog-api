const PostsModel = (sequelize, DataTypes) => {
    const postsSchema = sequelize.define('Posts', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: DataTypes.INTIGER,
        published: DataTypes.DATETIME,
        update: DataTypes.DATETIME,
    }, {
        timestamps: false,
        tableName: 'blogPosts',
        underscored: true,
    });
    postsSchema.associate = (models) => {
        userSchema.belongsTo(models.users, {
            foreignKey: 'userId', as: 'user'
        })
    };
    postsSchema.associate = (models) => {
        userSchema.belongsTo(models.posts_categories, {
            as: 'posts',
            foreignKey: 'postId',
        })
    }
    return postsSchema;
}

module.exports = PostsModel;