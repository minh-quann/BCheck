import { DataTypes } from "sequelize";
import sequelize from "../config/db_connection.js";
import Job from "./jobModel.js"; 
import User from "./userModel.js";

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
    result: {
        type: DataTypes.STRING,
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
    payer_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: "users", 
            key: "id",
        },
        onDelete: "SET NULL",
    },
}, {
    tableName: "job_documents",
    timestamps: true,
    underscored: true,
});

// Thiết lập quan hệ 1-n giữa Job và JobDocument
Job.hasMany(JobDocument, { foreignKey: "job_id", as: "documents" });
JobDocument.belongsTo(Job, { foreignKey: "job_id", as: "job" });
JobDocument.belongsTo(User, { foreignKey: "payer_id", as: "payer" });

export default JobDocument;
