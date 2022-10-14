const CategoriesModel = (sequelize, DataTypes) => {
    const schema = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
        name: DataTypes.STRING,
    }, 
    {
      timestamps: false,
      tableName: 'categories',
      underscored: true,
    }
    );
    // schema.associate = (models) => {
    //     schema.hasMany(models.PostCategory, {
    //         foreignKey: 'category_id',
    //         as: 'posts_id',
    //     })
    // }
    return schema;
}

module.exports = CategoriesModel;