import { DataTypes } from "sequelize";
import sequelize from "../config/db_connection.js";

const PaymentD = sequelize.define(
  "PaymentD",
  {
    invoice: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
    receipt: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("đang phân tích", "hợp lệ", "không hợp lệ"),
      allowNull: false,
    },
  },
  {
    tableName: "payment_d",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default PaymentD;
