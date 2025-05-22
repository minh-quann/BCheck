const express = require('express');
const syncModels = require('./models/syncModel');
const roleRouter = require('./routes/role');

const app = express();
const port = 3000;
const cors = require('cors');
app.use(express.json());

// Định tuyến
app.use('/api/role', roleRouter);

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
