import { DataTypes } from "sequelize";
import sequelize from "../config/db_connection.js";

const Job = sequelize.define("Job", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    job_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    job_description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: { 
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "pending", 
    },
}, {
    tableName: "jobs",
    timestamps: true,
    underscored: true,
});

export default Job;