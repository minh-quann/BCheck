const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const port = 3000;

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const prefix = req.originalUrl.includes('upload-request') ? 'hdtt' : 'hdck';
    const ext = path.extname(file.originalname);
    cb(null, `${prefix}${ext}`);
  },
});

const upload = multer({ storage });

app.post('/upload-request', upload.single('image'), async (req, res) => {
  console.log('File yêu cầu:', req.file.path);

  const filePath = path.join(__dirname, 'uploads', 'hdtt.jpg');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Không tìm thấy file hdtt để gửi' });
  }

  const formData = new FormData();
  formData.append('image', fs.createReadStream(filePath));

  try {
    const n8nWebhookUrl = 'https://minh-quan.app.n8n.cloud/webhook-test/upload-image';
    const response = await axios.post(n8nWebhookUrl, formData, {
      headers: formData.getHeaders(),
    });

    console.log('Đã gửi file hdtt lên n8n thành công');
    res.json({ message: 'Upload + Gửi n8n thành công', path: req.file.path, n8nResponse: response.data });
  } catch (err) {
    console.error('Gửi n8n thất bại:', err.message);
    res.status(500).json({ error: 'Upload xong nhưng gửi n8n thất bại', detail: err.message });
  }
});

app.post('/upload-origin', upload.single('image'), (req, res) => {
  console.log('File gốc:', req.file.path);
  res.json({ message: 'Hóa đơn gốc đã nhận', path: req.file.path });
});

app.post('/analyze-hdtt', async (req, res) => {
  const filePath = path.join(__dirname, 'uploads', 'hdtt.jpg'); 

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Không tìm thấy file hdtt' });
  }

  const formData = new FormData();
  formData.append('image', fs.createReadStream(filePath));

  try {
    const n8nWebhookUrl = 'https://minh-quan.app.n8n.cloud/webhook-test/upload-image';
    const response = await axios.post(n8nWebhookUrl, formData, {
      headers: formData.getHeaders(),
    });

    res.json({ message: 'Đã gửi ảnh hdtt lên n8n thành công', n8nResponse: response.data });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Gửi ảnh thất bại', detail: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});
