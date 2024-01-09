import express from "express";
import dashboardController from "../controllers/dashboardController";
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
import pool from "../config/connectDB";

let router = express.Router();



let initWebRouter = (app) => {
    app.use((req, res, next) => {
        res.locals.formattedAmount = (amount) => {
            const formattedAmount = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0,
            }).format(amount);
            return formattedAmount;
        };
        next();
    });

    app.get('/api/countBook', async (req, res) => {
        try {
            const [counts, fields] = await pool.execute("SELECT COUNT(*) AS sl FROM sach WHERE trangthaiduyet = 'choduyet'");
            const count = counts[0].sl;
            res.json({ count });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });



    app.use((req, res, next) => {
        res.locals.formatDate = (date) => {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            return new Date(date).toLocaleDateString('vi-VN', options);
        };
        next();
    });

    router.post('/api-adminlogin', loginController.getLogin);
    router.get('/api-admin', loginController.getDetailAccount);
    router.get('/', loginController.getLoginPage);
    router.get('/logout', auth.isLogout);
    router.get('/get-DetailAccount', auth.isLogin, loginController.getDetailAccount)
    router.get('/edit-Account', auth.isLogin, loginController.editAccount)
    router.post('/update-Account', auth.isLogin, upload.single('hinh'), loginController.updateAccount)

    //dashbord
    router.post('/newAccountStatistics', dashboardController.newAccountStatistics)
    router.get('/home', auth.isLogin, dashboardController.dashboardPage);
    router.post('/calculateOverallRevenue', dashboardController.calculateOverallRevenue)
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
    router.post('/rentalBan', auth.isLogin, userController.rentalBan);
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

    //phieuthue
    router.get('/rental', auth.isLogin, rentalController.listRentals)
    router.get('/detailRentals', auth.isLogin, rentalController.detailRentals)

    return app.use("/", router)
}
export default initWebRouter;