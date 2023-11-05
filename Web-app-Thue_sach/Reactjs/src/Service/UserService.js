import axios from "./axios";

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}
const loginApi = (email, password) => {
    return axios.post("/api/login", { email, password });
}
export { fetchAllUser, loginApi };