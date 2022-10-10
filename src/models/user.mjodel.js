const UserModel = (sequelize, DataTypes) => {
    const userSchema = sequelize.define('User', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        displayName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        image: DataTypes.STRING,
    }, {
        timestamps: false,
        tableName: users,
        underscored: true,
    });
    userSchema.associate = (models) => {
        userSchema.hasMany(models.blog_posts, {
            foreignKey: 'userId', as: 'posts'
        })
    };
    return userSchema;
}

module.exports = UserModel;
