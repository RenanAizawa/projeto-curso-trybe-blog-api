const PostsModel = (sequelize, DataTypes) => {
    const postsSchema = sequelize.define('User', {
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        user_id: DataTypes.INTIGER,
        published: DataTypes.DATETIME,
        update: DataTypes.DATETIME,
    }, {
        timestamps: false,
        tableName: users,
    });
    postsSchema.associate = (models) => {
        userSchema.belongsTo(models.users, {
            foreignKey: 'user_id', as: 'user'
        })
    };
    postsSchema.associate = (models) => {
        userSchema.belongsTo(models.posts_categories, {
            as: 'posts',
            foreignKey: 'post_id',
        })
    }
    return postsSchema;
}

module.exports = PostsModel;