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
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: "jobs",
    timestamps: true,
    underscored: true,
});

export default Job;