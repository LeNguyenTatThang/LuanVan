
import userService from "../services/userService"

let getUser = async (req, res) => {

    return res.render('user/listUser.ejs');

}


// let getAddUser = (req, res) => {
//     return res.render('user/postUser.ejs');
// }

// let deleteUser = async (req, res) => {
//     let id = req.query.id;
//     if (id) {
//         await userService.deleteUserByID(id);
//         return res.redirect('/user');
//     } else {
//         return res.send('ko ton tai');
//     }
// }

// let editPageUser = async (req, res) => {
//     let id = req.query.id;
//     if (id) {
//         let data = await userService.getUserFromByID(id);
//         return res.render('user/editUser.ejs', { data: data });
//     } else {
//         return res.send('id ko ton tai');
//     }
// }

// let putUser = async (req, res) => {
//     let data = req.body;
//     let user = await userService.updateUser(data);
//     return res.redirect('/user');

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
    let userData = await userService.handleUserLogin(email, matkhau);
    return res.status(200).json({
        errcode: userData.errcode,
        message: userData.errMessage,
        user: userData.user ? userData.user : { 'a': 'abc' }
    })
}

//api đăng kí
let Apiregister = async (req, res) => {
    let user = req.body
    if (!user.ten || !user.email || !user.matkhau) {
        return res.status(500).json({
            message: "email và mật khẩu không được để trống"
        })
    }
    let userData = await userService.registerUser(user);

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