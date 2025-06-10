import multer from "multer";
import path from "path";
import fs from "fs";

// Cấu hình nơi lưu file
// Lấy đường dẫn thư mục uploads
const uploadPath = path.resolve("uploads");

// Tự động tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

// Lọc loại file nếu cần (PDF, Word, hình...)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Loại file không hợp lệ"), false);
    }
};

const save = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});

export default save;