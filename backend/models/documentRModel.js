const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const DocumentR = sequelize.define(
  "DocumentR",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    document: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reject_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "document_r",
    timestamps: false,
  }
);

module.exports = DocumentR;
