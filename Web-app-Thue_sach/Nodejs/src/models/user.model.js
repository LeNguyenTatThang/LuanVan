import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
import pool from "../config/connectDB";

const user = function () { }
// //api


user.handleUserLogin = (email, matkhau) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            console.log(email);
            console.log(matkhau);
            let isCheck = await checkEmail(email);
            if (isCheck) {
                const [rows, fields] = await pool.execute('SELECT id,ten, email,matkhau, trangthai FROM users where email= ?', [email])
                let user = rows[0];
                if (user) {
                    let checkmk = await bcrypt.compareSync(matkhau, user.matkhau);
                    if (checkmk) {
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



// kiểm tra email
user.checkEmail = (email) => {
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

// ma hoa mat khau
let hashUsePassword = (matkhau) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(matkhau, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e)
        }
    })
}

// đăng kí email
user.registerUser = async (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let check = await checkEmail(user.email)
            console.log(user.matkhau)
            let matkhau = await hashUsePassword(user.matkhau)
            console.log(matkhau)
            let loai = 1;
            let hoatdong = 0;
            if (check === false) {
                await pool.execute('insert into users(ten, email, matkhau, loai, hoatdong) values (?, ?, ?, ?, ?)',
                    [user.ten, user.email, matkhau, loai, hoatdong]);
                userData = {
                    errcode: 0,
                    message: 'Đăng kí thành công'
                }
            } else {
                userData = {
                    errcode: 1,
                    message: 'email đã tồn tại'
                }
            }
            resolve(userData)
            console.log(userData)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = user