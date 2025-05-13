const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();

    let filename = 'unknown' + extension;

    if (req.originalUrl === '/upload-request') {
      filename = 'hdtt' + extension;
    } else if (req.originalUrl === '/upload-origin') {
      filename = 'hdck' + extension;
    }

    cb(null, filename);
  },
});

const upload = multer({ storage });

app.post('/upload-request', upload.single('image'), (req, res) => {
  console.log('File yêu cầu:', req.file.path);
  res.json({ message: 'Yêu cầu đã nhận', path: req.file.path });
});

app.post('/upload-origin', upload.single('image'), (req, res) => {
  console.log('File gốc:', req.file.path);
  res.json({ message: 'Hóa đơn gốc đã nhận', path: req.file.path });
});

app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});
