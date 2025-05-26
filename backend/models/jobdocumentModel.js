import { DataTypes } from "sequelize";
import sequelize from "../config/db_connection.js";
import Job from "./jobModel.js"; 

const JobDocument = sequelize.define("JobDocument", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    invoice_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    receipt_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "jobs", 
            key: "id",
        },
        onDelete: "CASCADE",
    },
}, {
    tableName: "job_documents",
    timestamps: true,
    underscored: true,
});

// Thiết lập quan hệ 1-n giữa Job và JobDocument
Job.hasMany(JobDocument, { foreignKey: "job_id", as: "documents" });
JobDocument.belongsTo(Job, { foreignKey: "job_id", as: "job" });

export default JobDocument;
