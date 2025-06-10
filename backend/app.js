import express from 'express';
import syncModels from './models/syncModel.js';
import roleRouter from './routers/roleRouter.js';
import jobRouter from './routers/jobRouter.js';
import userRouter from './routers/userRouter.js';
import docRouter from './routers/documentRouter.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


// Định tuyến
app.use('/api/roles', roleRouter);
app.use("/api/jobs", jobRouter);
app.use('/api/users', userRouter);
app.use('/api/documents', docRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Đồng bộ model và khởi chạy server
(async () => {
  try {
    await syncModels();
    console.log(' Đã đồng bộ bảng thành công.');

    app.listen(port, () => {
      console.log(` Server chạy tại: http://localhost:${port}`);
    });
  } catch (error) {
    console.error(' Lỗi khi đồng bộ bảng:', error);
    process.exit(1); 
  }
})();
