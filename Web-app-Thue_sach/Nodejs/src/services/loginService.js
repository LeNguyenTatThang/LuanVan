import { raw } from "body-parser";
import pool from "../config/connectDB";
let handleAdminLogin = (email, matkhau) => {
    return new Promise(async (resolve, reject) => {
        try {
            let adminData = {};
            let isExit = await checkEmail(email);
            console.log(isExit)
            if (isExit) {
                const [rows, fields] = await pool.execute('SELECT email,matkhau, loai FROM users where email= ?', [email])
                let admin = rows[0];
                if (admin) {
                    if (admin.matkhau == matkhau) {
                        if (admin.loai === 0) {
                            adminData.errcode = 0;
                            adminData.errMessage = 'ok';
                            delete admin.matkhau;
                            adminData.admin = admin;
                        } else {
                            adminData.errcode = 1;
                            adminData.errMessage = "ban ko co quyen truy cap";
                        }
                    } else {
                        adminData.errcode = 3;
                        adminData.errMessage = "sai mat khau";
                    }
                } else {
                    adminData.errcode = 4;
                    adminData.errMessage = "sai email";
                }
            } else {
                adminData.errcode = 5;
                adminData.errMessage = "email khong ton tai";
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

let detailAcount = (adminID) => {
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

export default {
    handleAdminLogin, detailAcount
}