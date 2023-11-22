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

export { fetchAllUser, loginApi, apiRegister, addBook, apiListCate, apiListBook, detailBookUser, apiAuthurRandom };