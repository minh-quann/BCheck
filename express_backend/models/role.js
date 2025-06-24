let Sequelize = require( 'sequelize');
let db = require( '../config/database.js' );

let roleSchema = db.define(
    'Role',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        tableName: 'roles',
        timestamps: true
    }
);

roleSchema.associate = (models) => {
    roleSchema.hasMany(models.User, {
        foreignKey: 'role_id',
        as: 'users'
    });
}

module.exports = roleSchema;