import user from "../models/user.model"

const getUser = async (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    let name = req.query.name;
    if (name) {
        let data = await user.getAll(page, name);
        return res.render('user/listUser.ejs', {
            data: data.rows,
            totalPage: data.totalPage,
            name: data.name,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page),

        })
    } else {
        let data = await user.getAll(page, name);
        return res.render('user/listUser.ejs', {
            data: data.rows,
            name: data.name,
            totalPage: data.totalPage,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page)
        })
    }
}







//api

// api đăng nhập user
let userApiLogin = async (req, res) => {
    let email = req.body.email;
    let matkhau = req.body.matkhau;
    if (!email || !matkhau) {
        return res.status(500).json({
            errcode: 1,
            message: 'vui lòng nhập gmail và mật khẩu'
        })
    }
    let userData = await user.handleUserLogin(email, matkhau);
    return res.status(200).json({
        errcode: userData.errcode,
        message: userData.errMessage,
        user: userData.user ? userData.user : { 'a': 'abc' }
    })
}

//api đăng kí

let Apiregister = async (req, res) => {
    try {
        let data = req.body
        if (!data.ten || !data.email || !data.matkhau) {
            return res.status(400).json({
                status: 400,
                message: "tên, email và mật khẩu không được để trống"
            })
        }
        let userData = await user.registerUser(data);
        if (userData.errcode == 0) {
            return res.status(200).json({
                status: 200,
                message: userData.message
            })
        } else {
            return res.status(401).json({
                status: 401,
                message: userData.message
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'lỗi hệ thống'
        })
    }
}



module.exports = {
    getUser,
    userApiLogin,
    Apiregister
}