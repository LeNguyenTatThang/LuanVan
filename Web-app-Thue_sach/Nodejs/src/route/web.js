import express from "express";
import homeController from "../controllers/homeController";
import categoryController from "../controllers/categoryController";
import userController from "../controllers/userController";
import loginController from "../controllers/loginController";
import bookController from "../controllers/bookController";
import auth from "../middelware/auth";
let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', loginController.getLoginPage);
    router.get('/logout', auth.isLogout);
    router.get('/get-DetailAccount', auth.isLogin, loginController.getDetailAccount)
    router.get('/home', auth.isLogin, homeController.getHomePage);
    // router.get('/product', homeController.getProduct);
    router.get('/category', auth.isLogin, categoryController.getCategory);
    router.get('/add-category', auth.isLogin, categoryController.getAddCategory);
    router.post('/post-category', auth.isLogin, categoryController.postCatetory);
    router.get('/edit-category', auth.isLogin, categoryController.getEditCategory);
    // router.post('/put-category', categoryController.putCategory);
    router.get('/delete-category/:id', categoryController.deleteCategory);
    router.get('/user', auth.isLogin, userController.getUser);
    // router.post('/post-user', userController.postUser);
    // router.get('/add-user', userController.getAddUser);
    // router.get('/delete-user', userController.deleteUser);
    // router.get('/edit-user', userController.editPageUser);
    // router.post('/put-user', userController.putUser);
    // router.post('/api/login', userController.handlelogin);
    router.post('/post-login', loginController.getLogin);
    router.get('/get-book', auth.isLogin, bookController.getbook);
    router.get('/get-detailbook', auth.isLogin, bookController.getDetailBook);
    return app.use("/", router)
}
export default initWebRouter;