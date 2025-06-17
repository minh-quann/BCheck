let Sequelize = require('sequelize');
let db = require('../config/database.js');
let bcrypt = require('bcrypt');

let userSchema = db.define(
    'User',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tokenResetPassword: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        },
        tokenResetPasswordExp: {
            type: Sequelize.DATE,
            allowNull: true
        },
    },
    {
        tableName: 'users',
        timestamps: true,
        hooks: {
            beforeCreate: async (user, options) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user, options) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    }
);

userSchema.associate = (models) => {
    userSchema.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'roles'
    });

    userSchema.hasMany(models.Document, {
        foreignKey: 'user_id',
        as: 'jobs'
    });
}


module.exports = userSchema;