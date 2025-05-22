import sequelize from "../config/db_connection.js";
import { Sequelize } from "sequelize";

// Import models
import roleModel from "./roleModel.js";
import userModel from "./userModel.js";
import documentRModel from "./documentRModel.js";
import paymentDModel from "./paymentDModel.js";
import paymentRModel from "./paymentRModel.js";
import paymentRDModel from "./paymentRDModel.js";
import Job from "./jobModel.js";
import JobDocument from "./jobdocumentModel.js";

const models = [
  { name: "roleModel", model: roleModel },
  { name: "userModel", model: userModel },
  { name: "jobModel", model: Job },
  { name: "jobdocumentModel", model: JobDocument },
  { name: "documentRModel", model: documentRModel },
  { name: "paymentDModel", model: paymentDModel },
  { name: "paymentRModel", model: paymentRModel },
  { name: "paymentRDModel", model: paymentRDModel },
];

async function checkTableExists(tableName) {
  const result = await sequelize.query(
    `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = :table AND TABLE_SCHEMA = :schema`,
    {
      replacements: {
        table: tableName,
        schema: sequelize.getDatabaseName(),
      },
      type: Sequelize.QueryTypes.SELECT,
    }
  );
  return result.length > 0;
}

async function syncModels() {
  try {
    await sequelize.authenticate();
    console.log("Kết nối CSDL thành công!");

    for (const { name, model } of models) {
      const tableName = model.getTableName();

      const existedBefore = await checkTableExists(tableName);

      await model.sync({ alter: true });

      const existedAfter = await checkTableExists(tableName);

      if (!existedBefore && existedAfter) {
        console.log(`${name}: Đã tạo bảng '${tableName}'.`);
      } else if (existedBefore) {
        console.log(
          `${name}: Bảng '${tableName}' đã có, đã kiểm tra và cập nhật nếu cần.`
        );
      } else {
        console.log(` ${name}: Trạng thái không xác định.`);
      }
    }

    console.log("Hoàn tất xử lý các bảng.");
  } catch (err) {
    console.error("Lỗi kết nối hoặc tạo bảng:", err);
    throw err; 
  }
}

export default syncModels;
