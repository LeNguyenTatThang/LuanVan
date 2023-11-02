import express from "express";
import homeController from "../controllers/homeController";
import categoryController from "../controllers/categoryController";
import userController from "../controllers/userController";
import loginController from "../controllers/loginController";
import bookController from "../controllers/bookController";
import auth from "../middelware/auth";
let router = express.Router();

let initApiRouter = (app) => {
    //Admin
    router.post('/api-adminlogin', loginController.getApiLogin);
    router.get('/api-admin', loginController.dataAccount);
    router.get('/get-api-listCatetory', categoryController.getApiListCategory);
    router.post('/post-api-catetory', categoryController.postApiCategory);
    router.delete('/delete-api-catetory/:id', categoryController.deleteApiCategory)

    //User
    router.get('/get-api-listBook', bookController.getApiListBook)
    return app.use("/", router)
}
export default initApiRouter;