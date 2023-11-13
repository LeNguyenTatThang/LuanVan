import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype == "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, "src/public/img/");
        } else {
            cb(new Error('not image'));
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;