const express = require('express');
const syncModels = require('./config/sync');

const app = express();
const port = 3000;

(async () => {
  try {
    await syncModels();
    console.log('Đã đồng bộ bảng thành công.');

    app.listen(port, () => {
      console.log(`Server chạy tại http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Lỗi khi đồng bộ bảng:', error);
    process.exit(1);
  }
})();
