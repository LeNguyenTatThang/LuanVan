const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, '/public/img');
        } else {
            cb(new Error('not image'), false);
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});




const upload = async (req, res, next) => {
    try {
        multer({ storage: storage });
        next();
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    upload
}