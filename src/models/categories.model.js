const CategoriesModel = (sequelize, DataTypes) => {
    const schema = sequelize.define('Categories', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
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