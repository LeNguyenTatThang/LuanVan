// import db from "../models";
// import bcrypt from "bcrypt";
// const salt = bcrypt.genSaltSync(10);
import pool from "../config/connectDB";
// let getAllUser = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let user = await db.user.findAll(
//                 { raw: true }
//             );
//             resolve(user);
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// let createUser = async (data) => {
//     // let hashPasswordFromBcrypt = await hashUsePassword(data.password);
//     // console.log(data);
//     // console.log(hashPasswordFromBcrypt);
//     return new Promise(async (resolve, reject) => {
//         try {
//             let hashPasswordFromBcrypt = await hashUsePassword(data.password);
//             await db.user.create(
//                 {
//                     email: data.email,
//                     userName: data.userName,
//                     password: hashPasswordFromBcrypt,
//                     gender: data.gender === '1' ? true : false,
//                     roleId: data.roleId,

//                 }
//             );
//             resolve(data);
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// let hashUsePassword = (password) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let hashPassword = await bcrypt.hashSync(password, salt);
//             resolve(hashPassword);
//         } catch (e) {
//             reject(e)
//         }



//     })
// }

// let deleteUserByID = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let users = await db.user.findOne(
//                 { where: { id: id } })
//             if (id) {
//                 await users.destroy();

//             }
//             resolve();
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// let getUserFromByID = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let users = await db.user.findOne(
//                 { where: { id: id }, raw: true })
//             resolve(users);
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// let updateUser = (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let users = await db.user.findOne(
//                 { where: { id: data.id } }
//             );
//             if (users) {
//                 users.userName = data.userName;
//                 users.gender = data.gender;
//                 users.roleId = data.roleId;
//                 await users.save();
//                 let alluser = await db.user.findAll(
//                     { raw: true }
//                 );
//                 resolve(alluser);
//             } else {
//                 resolve();
//             }
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// //api

// dang nhap user
let handleUserLogin = (email, matkhau) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            console.log(email);
            console.log(matkhau);
            let isCheck = await checkEmail(email);
            if (isCheck) {
                const [rows, fields] = await pool.execute('SELECT email,matkhau, loai FROM users where email= ?', [email])
                let user = rows[0];
                if (user) {
                    if (user.matkhau == matkhau) {
                        userData.errcode = 0;
                        userData.errMessage = 'đăng nhập thành công';
                        delete user.matkhau;
                        userData.user = user;
                    } else {
                        userData.errcode = 3;
                        userData.errMessage = "sai mật khẩu";
                    }
                } else {
                    adminData.errcode = 4;
                    adminData.errMessage = "sai email";
                }
            } else {
                userData.errcode = 5;
                userData.errMessage = "email không tồn tại";
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}



let checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM users where email= ?', [email])
            let admin = rows[0];
            if (admin) {
                resolve(true);
            } else {
                resolve(false);
            }

        }
        catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    handleUserLogin,
    // checkUserEmail, getAllUser, createUser, deleteUserByID, getUserFromByID, updateUser
}