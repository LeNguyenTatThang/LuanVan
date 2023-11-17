import express from "express";
import homeController from "../controllers/homeController";
import categoryController from "../controllers/categoryController";
import userController from "../controllers/userController";
import loginController from "../controllers/loginController";
import bookController from "../controllers/bookController";
import authorController from "../controllers/authorController"
import auth from "../middelware/auth";
import upload from "../multer"
let router = express.Router();

let initApiRouter = (app) => {

    //api đăng nhập admin
    router.post('/api-adminlogin', loginController.getApiLogin);

    // api lấy chi tiết admin
    router.get('/api-admin', loginController.dataAccount);

    // api danh sách thể loại
    router.get('/get-api-category', categoryController.apiListCategory)


    //api lấy ds phân trang bên user
    router.get('/get-api-listBook', bookController.postApiListBookUser)

    // api đăng nhập user
    router.post('/api-userLogin', userController.userApiLogin);

    // api đăng kí user
    router.post('/api-userRegister', userController.Apiregister)

    //sach

    //api thêm sách
    router.post('/post-api-book', upload.single('hinh'), bookController.postBook)

    //api chi tiết sách trang user và admin
    router.get('/get-api-detailBook', bookController.getApiDetailBooks)


    router.get('/get-api-bookAdmin', bookController.apilistBook)





    router.post("/register", upload.single("photo"), (req, res) => {
        const { fname } = req.body;
        const { filename } = req.file;


        if (!fname || !filename) {
            res.status(422).json({ status: 422, message: "fill all the details" })
        }

        try {

            let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

            conn.query("INSERT INTO usersdata SET ?", { username: fname, userimg: filename, date: date }, (err, result) => {
                if (err) {
                    console.log("error")
                } else {
                    console.log("data added")
                    res.status(201).json({ status: 201, data: req.body })
                }
            })
        } catch (error) {
            res.status(422).json({ status: 422, error })
        }
    });


    // get user data
    router.get("/getdata", (req, res) => {
        try {
            conn.query("SELECT * FROM usersdata", (err, result) => {
                if (err) {
                    console.log("error")
                } else {
                    console.log("data get")
                    res.status(201).json({ status: 201, data: result })
                }
            })
        } catch (error) {
            res.status(422).json({ status: 422, error })
        }
    });


    // delete user
    router.delete("/:id", (req, res) => {
        const { id } = req.params;
        try {
            conn.query(`DELETE FROM usersdata WHERE id ='${id}'`, (err, result) => {
                if (err) {
                    console.log("error")
                } else {
                    console.log("data delete")
                    res.status(201).json({ status: 201, data: result })
                }
            })
        } catch (error) {
            res.status(422).json({ status: 422, error })
        }
    })

    return app.use("/", router)


}
export default initApiRouter;