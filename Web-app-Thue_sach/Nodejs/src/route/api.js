import express from "express";
import categoryController from "../controllers/categoryController";
import userController from "../controllers/userController";
import loginController from "../controllers/loginController";
import bookController from "../controllers/bookController";
import authorController from "../controllers/authorController";
import rentalController from "../controllers/rentalController";
import commentController from "../controllers/commentController";
import chapterController from "../controllers/chapterController";
import blogController from "../controllers/blogController";
import upload from "../multer"
import uploadTxt from "../multerFile"
let router = express.Router();

let initApiRouter = (app) => {
    const pendingNotifications = new Map();


    // api danh sách thể loại
    router.get('/get-api-category', categoryController.apiListCategory)

    //api lấy chi tiết user theo loại (loai, id_users)
    router.get('/api/getUserByID', userController.userByID)

    //api lấy ds phân trang bên user
    router.get('/get-api-listBook', bookController.postApiListBookUser)

    // api đăng nhập user
    router.post('/api-userLogin', userController.userApiLogin);

    // api đăng kí user
    router.post('/api-userRegister', userController.Apiregister);

    // api xác nhận trạng thái
    router.patch('/api/accountVerification/:id', userController.accountVerification);


    //sach

    //api thêm đánh giá
    router.post('/apiRating', bookController.apiRating)

    //api thêm sách
    router.post('/post-api-book', upload.single('hinh'), bookController.postBook)


    //lấy ds sách không được duyệt theo id_users(id_users)
    router.get('/api/bookByIdUsersUnapproved', bookController.bookByIdUsersUnapproved)


    //api thông báo của sách (id_sach)
    router.post('/api/book/message', bookController.bookMessage)

    //api chi tiết sách trang user
    router.get('/get-api-detailBook', bookController.getApiDetailBooks)

    //cập nhật sách(có id, hinh,ten, noidung,trangthai, gia, tiencoc )
    router.patch('/api/book/update', upload.single('hinh'), bookController.updateBook)

    //cập nhật sách đọc online(có id, hinh,ten, noidung,trangthai)
    router.patch('/api/book/upbookOnline', upload.single('hinh'), bookController.upbookOnline)

    //lấy ds sách theo id_users(id_users)
    router.get('/api/bookByIdUsers', bookController.bookByIdUsers)

    //lấy ds sách theo ten,loai, theloai va tacgia (ten, loai, id_theloai)
    router.get('/api/bookByCatetoryAndAuthor', bookController.bookByCatetoryAndAuthor)
    //tac gia
    router.get('/get-api-randomAuthor', authorController.apiRandomAuthor)

    //lay random sach 3 quyen theo tacgia
    router.post('/get-api-randomBook', authorController.apiRandomBook)

    //api update user
    router.patch('/api/update-user', upload.single('hinh'), userController.apiUpdateUser)

    //api lấy sách theo tác giả
    router.post('/api/get-book-authur', authorController.apiGetBookAuthur)



    //Phiếu thuê

    //tạo phiếu thuê
    // có các thuộc tính(users_id, chutiem_id,tongtien,sach_id)
    router.post('/post-api-rental', rentalController.postRental)

    //api cập nhật trạng thái phiếu thuê thành xác nhận cho thuê(có id của phiếu thuê)
    router.patch('/api/confirmRental', rentalController.confirmRental)

    // api xác nhận nhận hàng (id , ngày thuê)
    router.patch('/api/receivedRental', rentalController.received)

    //api trả hàng (id)
    router.patch('/api/returnedRental', rentalController.returned)

    //api hoàn tất phiếu thuê (id)
    router.patch('/api/completedRental', rentalController.completed)

    //api hủy phiếu thuê  (id)
    router.patch('/api/cancelRental', rentalController.cancelRental)


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

    //lấy danh sách đơn hàng thuê trạng thái 5 đã hủy(users_id)
    router.post('/api/listRent5', rentalController.ListRent5)


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

    //lấy danh sách đơn hàng cho thuê trạng thái 5 bị hủy (chutiem_id)
    router.post('/api/RentOrder5', rentalController.rentalOrders5)

    //bình luận

    //api thêm bình luận có các thuộc tính(sach_id, users_id, noidung)
    router.post('/api/createComment', commentController.createComment)

    //api danh sach binh luận (cần có id của sách)
    router.post('/api/listComment', commentController.listComment)

    //noi dung sach

    //api thêm chương cho truyện đọc online (noidung, sach_id, tieude)
    router.post('/api/chapter/create', uploadTxt.single('noidung'), chapterController.postChapter)

    //api hiện danh sách chương theo id của sách (page, sach_id)
    router.post('/api/chapter/listchapter', chapterController.listBookchapter)

    //api hiện tất cả danh sách chương theo id của sách (sach_id)
    router.post('/api/chapter/listAllBookchapter', chapterController.listAllBookchapter)

    // hiện nội dung chương
    router.get('/api/chapter/detailchapter', chapterController.ContentChapter)

    // api cập nhập chương (id)
    router.patch('/api/chapter/updateChapter/', chapterController.updateChapter)

    //bài viết
    //api bài viết, có thể tìm kiếm theo tên (page, name)
    router.get('/api/Blog', blogController.apiGetBlog)

    //api lấy bài viết theo id (id)
    router.get('/api/apiGetBlogById', blogController.apiGetBlogById)
    return app.use("/", router)
}
export default initApiRouter;