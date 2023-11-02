
// import userService from "../services/userService"

let getUser = async (req, res) => {

    return res.render('user/listUser.ejs');

}

// let postUser = async (req, res) => {
//     let message = await userService.createUser(req.body);
//     return res.redirect('/user');

// }

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


// //api
// let handlelogin = async (req, res) => {
//     let email = req.body.email;
//     let password = req.body.password;
//     if (!email || !password) {
//         return res.status(500).json({
//             errcode: 1,
//             message: 'missing inputs parmeter'
//         })
//     }

//     let userData = await userService.handleUserLogin(email, password);


//     return res.status(200).json({
//         errcode: userData.errcode,
//         message: userData.errMessage,
//         user: userData.user ? userData.user : { 'a': 'abc' }

//     })
// }

module.exports = {
    getUser
}