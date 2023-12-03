import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
var pool = require('../config/connectDB')
const admin = function () { }

admin.handleAdminLogin = (email, matkhau) => {
    return new Promise(async (resolve, reject) => {
        try {
            let adminData = {};
            let isExit = await checkEmail(email);
            if (isExit) {
                const [rows, fields] = await pool.execute('SELECT id, ten, email,matkhau, loai FROM users where email= ?', [email])
                let admin = rows[0];
                if (admin) {
                    let checkmk = await bcrypt.compareSync(matkhau, admin.matkhau);
                    if (checkmk) {
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

admin.getId = function (id) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            const [rows, fields] = await pool.execute('SELECT id,hinh,ten FROM users where id= ?', [id])
            let dataAdmin = rows[0];
            if (dataAdmin) {
                data = {
                    errcode: 0,
                    dataAdmin,
                    message: 'ok',
                }
            } else {
                data = {
                    errcode: 1,
                    message: 'id không tồn tại',
                }
            }
            resolve(data)
        } catch (e) {
            reject(e);
        }
    })
}

admin.update = (data, hinhmoi) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('có data:', data, hinhmoi)
            console.log('hình mới lsf :', hinhmoi)
            let dataAdmin = {}
            await pool.execute('update users set ten= ?,hinh = ? where id = ?',
                [data.ten, hinhmoi, data.id]);
            dataAdmin = {
                errcode: 0,
                message: 'cập nhật thành công'
            }
            resolve(dataAdmin)
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = admin;
