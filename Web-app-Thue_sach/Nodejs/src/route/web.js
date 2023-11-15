import express from "express";
import homeController from "../controllers/homeController";
import categoryController from "../controllers/categoryController";
import userController from "../controllers/userController";
import loginController from "../controllers/loginController";
import bookController from "../controllers/bookController";
import authorController from "../controllers/authorController";
import auth from "../middelware/auth";
import upload from "../multer"


let router = express.Router();



let initWebRouter = (app) => {
    router.get('/', loginController.getLoginPage);
    router.get('/logout', auth.isLogout);
    router.get('/get-DetailAccount', auth.isLogin, loginController.getDetailAccount)
    router.get('/home', auth.isLogin, homeController.getHomePage);

    router.get('/get-catetoryFoByID', auth.isLogin, categoryController.getFromCatetoryByID)
    router.get('/category', auth.isLogin, categoryController.getCategory);
    router.get('/add-category', auth.isLogin, categoryController.getAddCategory);
    router.post('/post-category', auth.isLogin, categoryController.postCatetory);
    router.post('/put-category', categoryController.putCatetory);
    router.get('/delete-category/:id', categoryController.deleteCategory);

    router.get('/user', auth.isLogin, userController.getUser);

    // router.post('/post-user', userController.postUser);
    // router.get('/add-user', userController.getAddUser);
    // router.get('/delete-user', userController.deleteUser);
    // router.get('/edit-user', userController.editPageUser);
    // router.post('/put-user', userController.putUser);
    // router.post('/api/login', userController.handlelogin);
    router.post('/post-login', loginController.getLogin);

    router.get('/book', auth.isLogin, bookController.getbook);
    router.get('/get-detailbook', auth.isLogin, bookController.getDetailBook);
    router.post('/post-browsebook', auth.isLogin, bookController.BrowseBooks);

    //tac gia
    router.get('/author', auth.isLogin, authorController.getAuthor);
    router.get('/add-author', auth.isLogin, authorController.getAddAuthor);
    router.post('/post-author', auth.isLogin, upload.single('hinhtacgia'), authorController.postAuthor)
    router.get('/delete-author/:id', auth.isLogin, authorController.deleteAuthor)
    router.get('/get-authorFoByID', auth.isLogin, authorController.getIdAuthor)
    router.post('/update-author', auth.isLogin, upload.single('hinhtacgia'), authorController.updateAuthor)

    return app.use("/", router)
}
export default initWebRouter;