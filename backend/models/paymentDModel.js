const { DataTypes } = require("sequelize");
const sequelize = require("../connect/db_connection");

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

module.exports = PaymentD;
