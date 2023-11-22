import express from "express";
import categoryController from "../controllers/categoryController";
import userController from "../controllers/userController";
import loginController from "../controllers/loginController";
import bookController from "../controllers/bookController";
import authorController from "../controllers/authorController";
import rentalController from "../controllers/rentalController";
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

    //tac gia
    router.get('/get-api-randomAuthor', authorController.apiRandomAuthor)

    //lay random sach 3 quyen theo tacgia
    router.post('/get-api-randomBook', authorController.apiRandomBook)


    //tạo phiếu thuê
    // có các thuộc tính(users_id, chutiem_id,tongtien,sach_id)
    router.post('/post-api-rental', rentalController.postRental)

    //api update user
    router.patch('/api/update-user', userController.apiUpdateUser)

    //api lấy sách theo tác giả
    router.get('/api/get-book-authur', authorController.apiGetBookAuthur)
    return app.use("/", router)
}
export default initApiRouter;