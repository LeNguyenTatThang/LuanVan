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
const addBook = (hinh, ten, loai, theloai_id, gia, tiencoc, tentacgia, id_users) => {
    return axios.post("/post-api-book", { hinh, ten, loai, theloai_id, gia, tiencoc, tentacgia, id_users });
}

export { fetchAllUser, loginApi, apiRegister, addBook };