// import db from "../models";
// import bcrypt from "bcrypt";
// const salt = bcrypt.genSaltSync(10);

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
// let handleUserLogin = (email, password) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let userData = {};
//             let isExit = await checkUserEmail(email);
//             if (isExit) {
//                 let user = await db.user.findOne({
//                     attributes: ['email', 'roleId', 'password'],
//                     where: { email: email }, raw: true

//                 });
//                 if (user) {
//                     let check = await bcrypt.compareSync(password, user.password);
//                     if (check) {
//                         userData.errcode = 0;
//                         userData.errMessage = 'ok';
//                         delete user.password;
//                         userData.user = user;
//                     } else {
//                         userData.errcode = 3;
//                         userData.errMessage = 'wrong password';
//                     }

//                 } else {
//                     userData.errcode = 2;
//                     userData.errMessage = `User'a not found`
//                 }

//             } else {
//                 userData.errcode = 1;
//                 userData.errMessage = `your's Email inn't exist`

//             }
//             resolve(userData)
//         } catch (e) {
//             reject(e);
//         }
//     })
// }



// let checkUserEmail = (email) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let user = await db.user.findOne({
//                 where: { email: email }
//             })
//             if (user) {
//                 resolve(true);
//             } else {
//                 resolve(false);
//             }
//         } catch (e) {
//             reject(e);
//         }

//     })
// }

// module.exports = {
//     handleUserLogin, checkUserEmail, getAllUser, createUser, deleteUserByID, getUserFromByID, updateUser
// }