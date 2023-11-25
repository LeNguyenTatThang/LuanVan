import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTextFormats = ['text/plain'];
    const isValidText = allowedTextFormats.includes(file.mimetype);
    if (isValidText) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uploadTxt = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
});

module.exports = uploadTxt;