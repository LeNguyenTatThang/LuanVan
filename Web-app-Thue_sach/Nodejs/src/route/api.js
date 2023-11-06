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
    //Trang Admin 

    //dang nhap
    router.post('/api-adminlogin', loginController.getApiLogin);
    router.get('/api-admin', loginController.dataAccount);

    //the loai
    router.get('/get-api-listCatetory', categoryController.getApiListCategory);
    router.post('/post-api-catetory', categoryController.postApiCategory);
    router.delete('/delete-api-catetory/:id', categoryController.deleteApiCategory);
    router.get('/get-api-CatetoryByID', categoryController.getApiFromCatetoryByID);
    router.put('/put-api-category', categoryController.putApiCategory)

    //Trang User

    //User
    router.get('/api-userLogin', userController.userApiLogin);
    router.post('/api-userRegister', userController.Apiregister)

    //sach
    router.get('/get-api-listBook', bookController.getApiListBook)
    router.post('/post-api-book', bookController.postBook)
    //tac gia
    router.get('/post-api-author', authorController.postApiAuthor)


    return app.use("/", router)


}
export default initApiRouter;