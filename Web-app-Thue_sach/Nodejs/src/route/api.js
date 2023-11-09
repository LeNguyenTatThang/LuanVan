import express from "express";
import homeController from "../controllers/homeController";
import categoryController from "../controllers/categoryController";
import userController from "../controllers/userController";
import loginController from "../controllers/loginController";
import bookController from "../controllers/bookController";
import authorController from "../controllers/authorController"
import auth from "../middelware/auth";
let router = express.Router();

let initApiRouter = (app) => {

    //api đăng nhập admin
    router.post('/api-adminlogin', loginController.getApiLogin);

    // api lấy chi tiết admin
    router.get('/api-admin', loginController.dataAccount);

    // api danh sách thể loại
    router.get('/get-api-listCatetory', categoryController.getApiListCategory);

    //api thêm thể loại
    router.post('/post-api-catetory', categoryController.postApiCategory);

    //api xóa thể loại
    router.delete('/delete-api-catetory/:id', categoryController.deleteApiCategory);

    //api lấy chi tiết thể loại
    router.get('/get-api-CatetoryByID', categoryController.getApiFromCatetoryByID);

    //api sửa thể loại
    router.put('/put-api-category', categoryController.putApiCategory)

    //api lấy ds phân trang tìm kiếm sách admin
    router.get('/get-api-listBook', bookController.getApiListBook)

    //api lấy ds phân trang bên user
    router.post('/post-api-listBook', bookController.postApiListBookUser)

    //api duyệt sách
    router.put('/put-api-browseBook', bookController.apiBrowseBooks)

    // api đăng nhập user
    router.post('/api-userLogin', userController.userApiLogin);

    // api đăng kí user
    router.post('/api-userRegister', userController.Apiregister)

    //sach

    //api thêm sách
    router.post('/post-api-book', bookController.postBook)

    //api chi tiết sách trang user và admin
    router.get('/get-api-detailBook', bookController.getApiDetailBooks)

    //tac gia


    //api tacgia và ds sách của tác giả
    router.get('/get-api-authorBook', authorController.getApiAuthorBook)

    //api lấy danh sách tác giả
    router.get('/get-api-listAuthor', authorController.getApiListAuthor)

    //api thêm tác giả
    router.post('/post-api-author', authorController.postApiAuthor)



    return app.use("/", router)


}
export default initApiRouter;