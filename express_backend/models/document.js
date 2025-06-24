let Sequelize = require('sequelize');
let db = require('../config/database.js');

let documentSchema = db.define(
    'Document',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        invoice_url: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        receipt_url: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        result: {
            type: Sequelize.STRING,
        }
    },
    {
        tableName: 'documents',
        timestamps: true
    }
);

documentSchema.associate = (models) => {
    documentSchema.belongsTo(models.Job, {
        foreignKey: 'job_id',
        as: 'job'
    });
}

module.exports = documentSchema;