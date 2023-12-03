import express from "express";
import homeController from "../controllers/homeController";
import categoryController from "../controllers/categoryController";
import userController from "../controllers/userController";
import loginController from "../controllers/loginController";
import bookController from "../controllers/bookController";
import authorController from "../controllers/authorController";
import blogController from "../controllers/blogController";
import commentController from "../controllers/commentController";
import rentalController from "../controllers/rentalController"
import auth from "../middelware/auth";
import upload from "../multer"


let router = express.Router();



let initWebRouter = (app) => {
    router.get('/', loginController.getLoginPage);
    router.get('/logout', auth.isLogout);
    router.get('/get-DetailAccount', auth.isLogin, loginController.getDetailAccount)
    router.get('/edit-Account', auth.isLogin, loginController.editAccount)
    router.post('/update-Account', auth.isLogin, upload.single('hinh'), loginController.updateAccount)

    router.get('/home', auth.isLogin, homeController.getHomePage);

    router.get('/get-catetoryFoByID', auth.isLogin, categoryController.getFromCatetoryByID)
    router.get('/category', auth.isLogin, categoryController.getCategory);
    router.get('/add-category', auth.isLogin, categoryController.getAddCategory);
    router.post('/post-category', auth.isLogin, categoryController.postCatetory);
    router.post('/put-category', categoryController.putCatetory);
    router.get('/delete-category/:id', categoryController.deleteCategory);


    //tai khoan
    router.get('/user', auth.isLogin, userController.getUser);
    router.get('/detailUser', auth.isLogin, userController.detailUser);
    router.post('/disableCommentsUsers', auth.isLogin, userController.disableCommentsUsers);
    router.post('/DisableBookPosting', auth.isLogin, userController.DisableBookPosting);
    router.post('/post-login', loginController.getLogin);

    //sach
    router.get('/book1', auth.isLogin, bookController.book1);
    router.get('/book', auth.isLogin, bookController.getbook);
    router.get('/get-detailbook', auth.isLogin, bookController.getDetailBook);
    router.get('/detailBroweBook', auth.isLogin, bookController.detailBroweBook);
    router.post('/post-browsebook', auth.isLogin, bookController.BrowseBooks);
    router.get('/get-broweBook', auth.isLogin, bookController.getbrowebook)
    router.post('/post-Message', auth.isLogin, bookController.BoosMessage)

    //binh luan
    router.post('/updateCpmmentStatus', auth.isLogin, commentController.updateCpmmentStatus)

    //tac gia
    router.get('/author', auth.isLogin, authorController.getAuthor);
    router.get('/add-author', auth.isLogin, authorController.getAddAuthor);
    router.post('/post-author', auth.isLogin, upload.single('hinhtacgia'), authorController.postAuthor)
    router.get('/delete-author/:id', auth.isLogin, authorController.deleteAuthor)
    router.get('/get-authorFoByID', auth.isLogin, authorController.getIdAuthor)
    router.post('/update-author', auth.isLogin, upload.single('hinhtacgia'), authorController.updateAuthor)

    //Bai viet
    router.get('/blog', auth.isLogin, blogController.getBlog);
    router.get('/addBlogPage', auth.isLogin, blogController.addBlogPage);
    router.post('/post-blog', auth.isLogin, blogController.createBlog)
    router.get('/deleteBlog/:id', auth.isLogin, blogController.deleteBlog)
    router.get('/detaiBlog', auth.isLogin, blogController.detaiBlog)
    router.post('/updateBlog', auth.isLogin, blogController.updateBlog)

    router.get('/email', auth.isLogin, rentalController.testthuhtmlemail)

    return app.use("/", router)
}
export default initWebRouter;