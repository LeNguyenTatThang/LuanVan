import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
import pool from "../config/connectDB";

const admin = function () { }

admin.handleAdminLogin = (email, matkhau) => {
    return new Promise(async (resolve, reject) => {
        try {
            let adminData = {};
            let isExit = await checkEmail(email);
            if (isExit) {
                const [rows, fields] = await pool.execute('SELECT email,matkhau, loai FROM users where email= ?', [email])
                let admin = rows[0];
                if (admin) {
                    if (admin.matkhau == matkhau) {
                        if (admin.loai === 0) {
                            adminData.errcode = 0;
                            adminData.errMessage = 'đăng nhập thành công';
                            delete admin.matkhau;
                            adminData.admin = admin;
                        } else {
                            adminData.errcode = 1;
                            adminData.errMessage = "bạn không có quyền truy cập";
                        }
                    } else {
                        adminData.errcode = 3;
                        adminData.errMessage = "sai mật khẩu";
                    }
                } else {
                    adminData.errcode = 4;
                    adminData.errMessage = "sai email";
                }
            } else {
                adminData.errcode = 5;
                adminData.errMessage = "email không tồn tại";
            }
            resolve(adminData)
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

admin.detailAcount = (adminID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let adData = {};
            const [rows, fields] = await pool.execute('SELECT * FROM users where email= ?', [adminID])
            let admin = rows[0];
            if (admin) {
                adData.admin = admin;
                adData.code = 1
                resolve(adData);
            }
        } catch (error) {
            reject(error);
        }
    })

}

module.exports = admin;
