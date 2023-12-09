import axios from "./axios";

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}
const loginApi = (email, matkhau) => {
    return axios.post("/api-userLogin", { email, matkhau });
}
const apiRegister = (ten, email, matkhau,) => {
    return axios.post("/api-userRegister", { ten, email, matkhau });
}
const addBook = (hinh, ten, tinhtrang, loai, theloai_id, gia, tiencoc, tentacgia, id_users) => {

    return axios.post("/post-api-book", { hinh, ten, tinhtrang, loai, theloai_id, gia, tiencoc, tentacgia, id_users },
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
}
const apiListCate = () => {
    return axios.get("/get-api-category");
}
const apiListBook = async (page) => {
    return await axios.get(`/get-api-listBook?page=${page}`);
}

const detailBookUser = async (id) => {
    return await axios.get(`/get-api-detailBook?id=${id}`);
}

const apiAuthurRandom = () => {
    return axios.get('/get-api-randomAuthor');
}
const apiRandomBook = (id_tacgia) => {
    return axios.post('/get-api-randomBook', { id_tacgia })
}
//call api tạo phiếu thuê khi bấm Xác nhận
const callApiCreateRental = (users_id, chutiem_id, tongtien, sach_id, diachi, ngaythue) => {
    return axios.post('/post-api-rental', { users_id, chutiem_id, tongtien, sach_id, diachi, ngaythue })
}
//Call api của người thuê
const apiPostRent = (users_id, trangthai) => {
    return axios.post('/api/listRent', { users_id, trangthai });
}
//Call api nhận hàng của người thuê
const apiPostRentOne = (users_id) => {
    return axios.post('/api/listRent1', { users_id });
}
//call api xác nhận lấy hàng của người thuê
const apiConfirmRentOne = (id, ngaythue) => {
    return axios.patch('/api/receivedRental', { id, ngaythue });
}
//call api show để thấy sách đang được thuê
const apiPostRentTwo = (users_id) => {
    return axios.post('/api/listRent2', { users_id });
}
//lấy danh sách đơn hàng thuê trạng thái 3 /api/listRent3 (Chờ trả)
const apiRentOrderThree = (users_id) => {
    return axios.post('/api/listRent3', { users_id });
}
//api trả hàng của người thuê (Chờ trả) /api/returnedRental
const apiConfirmRentThree = (id) => {
    return axios.patch('/api/returnedRental', { id });
}
//lấy danh sách đơn hàng thuê trạng thái 4 /api/listRent4 => chưa sử dụng
const apiRentOrderFour = (users_id) => {
    return axios.post('/api/listRent4', { users_id });
}
//Call api của chủ tiệm xác nhận đặt hàng
const apiRentOrder = (chutiem_id, trangthai) => {
    return axios.post('/api/RentOrder', { chutiem_id, trangthai });
}
//onClick gọi đến api xác nhận cho thuê từ chủ tiệm
const apiConfirmRental = (id) => {
    return axios.patch('/api/confirmRental', { id });
}
//lấy danh sách đơn hàng cho thuê trạng thái 1(chờ gửi)
const apiRentOrderOne = (chutiem_id) => {
    return axios.post('/api/RentOrder1', { chutiem_id });
}
//call api lấy danh sách khách đang thuê sách của chủ tiệm /api/RentOrder2
const apiRentOrderTwo = (chutiem_id) => {
    return axios.post('/api/RentOrder2', { chutiem_id });
}
//call api lấy danh sách khách chờ trả sách của chủ tiệm /api/RentOrder3
const apiOrderThree = (chutiem_id) => {
    return axios.post('/api/RentOrder3', { chutiem_id });
}
//api submit xác nhận hoàn thành /api/completedRental
const apiCompleted = (id) => {
    return axios.patch('/api/completedRental', { id });
}
//call api lấy danh sách đã được thuê của chủ tiệm /api/RentOrder4 => chưa được sử dụng
const apiOrderFour = (chutiem_id) => {
    return axios.post('/api/RentOrder4', { chutiem_id });
}
//api comment api/listComment hiển thị bình luận => truyền vào id sách
const callApiComment = (id) => {
    return axios.post('api/listComment', { id })
}
//api send comment /api/createComment => đăng bình luận truyền vào sach_id, users_id, noidung
const apiSendComment = (sach_id, users_id, noidung) => {
    return axios.post('/api/createComment', { sach_id, users_id, noidung })
}

//api get chapter book
const callApiChapter = (id, sachId) => {
    return axios.get('/api/chapter/detailchapter', {
        params: {
            id: id,
            sach_id: sachId,
        },
    });
}
const callApiMail = (id) => {
    return axios.patch(`/api/accountVerification/${id}`);
}
export {
    fetchAllUser, loginApi, apiRegister, apiRandomBook,
    addBook, apiListCate, apiListBook, detailBookUser, apiAuthurRandom,
    callApiCreateRental,
    callApiComment, apiSendComment,
    apiPostRent, apiPostRentOne, apiPostRentTwo, apiRentOrderThree, apiRentOrderFour,
    apiConfirmRental, apiConfirmRentOne,
    apiRentOrder, apiRentOrderOne, apiRentOrderTwo, apiOrderThree, apiOrderFour,
    apiConfirmRentThree,
    apiCompleted,
    callApiChapter,
    callApiMail,
};