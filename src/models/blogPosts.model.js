const PostsModel = (sequelize, DataTypes) => {
    const postsSchema = sequelize.define('User', {
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
        tableName: users,
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
            foreignKey: 'post_id',
        })
    }
    return postsSchema;
}

module.exports = PostsModel;