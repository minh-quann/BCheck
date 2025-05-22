import { DataTypes } from "sequelize";
import sequelize from "../config/db_connection.js";
import PaymentR from "./paymentRModel.js";
import PaymentD from "./paymentDModel.js";

const PaymentRD = sequelize.define(
  "PaymentRD",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    request_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "payment_r",
        key: "id",
      },
    },
    document_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "payment_d",
        key: "id",
      },
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "payment_rd",
    timestamps: false,
  }
);

export default PaymentRD;
