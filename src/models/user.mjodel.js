const UserModel = (sequelize, DataTypes) => {
    const userSchema = sequelize.define('User', {
        display_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        timestamps: false,
        tableName: users,
    });
    userSchema.associate = (models) => {
        userSchema.hasMany(models.blog_posts, {
            foreignKey: 'user_id', as: 'posts'
        })
    };
    return userSchema;
}

module.exports = UserModel;
