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
<<<<<<< HEAD
const addBook = (hinh, ten, loai, theloai_id, tentacgia, id_users) => {

    return axios.post("/post-api-book", { hinh, ten, loai, theloai_id, tentacgia, id_users }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
=======
const addBook = (hinh, ten, loai, theloai_id, gia, tiencoc, tentacgia, id_users) => {

    return axios.post("/post-api-book", { hinh, ten, loai, theloai_id, gia, tiencoc, tentacgia, id_users },
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
}
const apiListCate = () => {
    return axios.get("/get-api-category");
>>>>>>> 39f164113aac52b6447acb9e68b6e4dcf2442820
}

export { fetchAllUser, loginApi, apiRegister, addBook, apiListCate };