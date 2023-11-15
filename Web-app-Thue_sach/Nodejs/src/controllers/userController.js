import user from "../models/user.model"

let getUser = async (req, res) => {

    return res.render('user/listUser.ejs');

}


// let getAddUser = (req, res) => {
//     return res.render('user/postUser.ejs');
// }




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
    let data = req.body
    if (!data.ten || !data.email || !data.matkhau) {
        return res.status(500).json({
            message: "email và mật khẩu không được để trống"
        })
    }
    let userData = await user.registerUser(data);
    return res.status(200).json({
        errcode: userData.errcode,
        message: userData.message
    })

}

module.exports = {
    getUser,
    userApiLogin,
    Apiregister
}