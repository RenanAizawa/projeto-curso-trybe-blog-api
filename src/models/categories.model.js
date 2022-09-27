const CategoriesModel = (sequelize, DataTypes) => {
    const schema = sequelize.define('User', {
        name: DataTypes.STRING,
    });
    schema.associate = (models) => {
        schema.hasMany(models.posts_categories, {
            foreignKey: 'category_id',
            as: 'category',
        })
    }
    return schema;
}

module.exports = CategoriesModel;