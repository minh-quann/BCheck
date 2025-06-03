import express from "express";
import syncModels from "./models/syncModel.js";
import roleRouter from "./routers/roleRouter.js";
import jobRouter from "./routers/jobRouter.js";
import userRouter from "./routers/userRouter.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Định tuyến
app.use("/api/roles", roleRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/users", userRouter);

// Đồng bộ model và khởi chạy server
(async () => {
  try {
    await syncModels();
    console.log(" Đã đồng bộ bảng thành công.");

    app.listen(port, () => {
      console.log(` Server chạy tại: http://localhost:${port}`);
    });
  } catch (error) {
    console.error(" Lỗi khi đồng bộ bảng:", error);
    process.exit(1);
  }
})();
