import express from "express";
import categoryController from "../controllers/categoryController";
import userController from "../controllers/userController";
import loginController from "../controllers/loginController";
import bookController from "../controllers/bookController";
import authorController from "../controllers/authorController";
import rentalController from "../controllers/rentalController";
import commentController from "../controllers/commentController";
import chapterController from "../controllers/chapterController";
import upload from "../multer"
import uploadTxt from "../multerFile"
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

    //cập nhật sách(có id, hinh, tinhtrang, gia, tiencoc )
    router.patch('/api/book/update', upload.single('hinh'), bookController.updateBook)


    //tac gia
    router.get('/get-api-randomAuthor', authorController.apiRandomAuthor)

    //lay random sach 3 quyen theo tacgia
    router.post('/get-api-randomBook', authorController.apiRandomBook)

    //api update user
    router.patch('/api/update-user', userController.apiUpdateUser)

    //api lấy sách theo tác giả
    router.get('/api/get-book-authur', authorController.apiGetBookAuthur)



    //Phiếu thuê

    //tạo phiếu thuê
    // có các thuộc tính(users_id, chutiem_id,tongtien,sach_id)
    router.post('/post-api-rental', rentalController.postRental)

    //api cập nhật trạng thái phiếu thuê thành xác nhận cho thuê
    router.patch('/api/confirmRental', rentalController.confirmRental)

    // api xác nhận nhận hàng có các thuộc tính(id , ngày thuê)
    router.patch('/api/receivedRental', rentalController.received)

    //api trả hàng có các thuộc tính(id)
    router.patch('/api/returnedRental', rentalController.returned)

    //api hoàn tất có các thuộc tính(id)
    router.patch('/api/completedRental', rentalController.completed)

    //lấy danh sách đơn hàng thuê có các thuộc tính(users_id, trangthai)
    router.post('/api/listRent', rentalController.ListRent)

    //lấy danh sách đơn hàng thuê trạng thái 1
    router.post('/api/listRent1', rentalController.ListRent1)

    //lấy danh sách đơn hàng thuê trạng thái 2
    router.post('/api/listRent2', rentalController.ListRent2)

    //lấy danh sách đơn hàng thuê trạng thái 3
    router.post('/api/listRent3', rentalController.ListRent3)

    //lấy danh sách đơn hàng thuê trạng thái 4
    router.post('/api/listRent4', rentalController.ListRent4)

    //lấy danh sách đơn hàng cho thuê
    // có các thuộc tính(chutiem_id, trangthai)
    router.post('/api/RentOrder', rentalController.rentalOrders)

    //lấy danh sách đơn hàng cho thuê trạng thái 1(chờ gửi)
    router.post('/api/RentOrder1', rentalController.rentalOrders1)

    //lấy danh sách đơn hàng cho thuê trạng thái 2(đang thuê)
    router.post('/api/RentOrder2', rentalController.rentalOrders2)

    //lấy danh sách đơn hàng cho thuê trạng thái 3(trờ trả)
    router.post('/api/RentOrder3', rentalController.rentalOrders3)

    //lấy danh sách đơn hàng cho thuê trạng thái 4(hoàn tất)
    router.post('/api/RentOrder4', rentalController.rentalOrders4)

    //bình luận

    //api thêm bình luận có các thuộc tính(sach_id, users_id, noidung)
    router.post('/api/createComment', commentController.createComment)

    //api danh sach binh luận (cần có id của sách)
    router.post('/api/listComment', commentController.listComment)

    //noi dung sach

    //api thêm chương cho truyện đọc online (noidung, sach_id, chuong)
    router.post('/api/chapter/create', uploadTxt.single('noidung'), chapterController.postChapter)

    //api hiện danh sách chương theo id của sách (page, sach_id)
    router.post('/api/chapter/listchapter', chapterController.listBookchapter)

    // hiện nội dung chương
    router.get('/api/chapter/detailchapter', chapterController.ContentChapter)

    return app.use("/", router)
}
export default initApiRouter;