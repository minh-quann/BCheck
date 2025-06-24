let Sequelize = require('sequelize');
let db = require('../config/database.js');

let jobSchema = db.define(
    'Job',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        job_name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        job_description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        start_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        end_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING(50),
            allowNull: false,
            defaultValue: "pending",
        },
    },
    {
        tableName: 'jobs',
        timestamps: true
    }
);

jobSchema.associate = (models) => {
    jobSchema.hasMany(models.Document, {
        foreignKey: 'job_id',
        as: 'documents'
    });

    jobSchema.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
    });
}

module.exports = jobSchema;