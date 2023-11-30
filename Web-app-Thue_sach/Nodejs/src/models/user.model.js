import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
import pool from "../config/connectDB";

const user = function () { }


user.handleUserLogin = (email, matkhau) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            console.log(email);
            console.log(matkhau);
            let isCheck = await user.checkEmail(email);
            if (isCheck) {
                const [rows, fields] = await pool.execute('SELECT id,ten, email,matkhau FROM users where email= ?', [email])
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

//xac that tai khoan
user.updateVerification = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userModel = {}
            let xacthuctaikhoan = 1
            let sqlcheck = "SELECT id FROM users where id = ?"
            let sql = "UPDATE users SET xacthuctaikhoan =? WHERE id =?"
            const [check] = await pool.execute(sqlcheck, [id])
            let dataUsers = check[0];
            if (dataUsers) {
                const [result, fields] = await pool.execute(sql, [xacthuctaikhoan, id])
                if (result) {
                    userModel = {
                        errcode: 0,
                        message: 'xác thực thành công'
                    }
                } else {
                    userModel = {
                        errcode: 1,
                        message: 'xác thực thất bại'
                    }
                }
            } else {
                userModel = {
                    errcode: 1,
                    message: 'tài khoản này không tồn tại'
                }
            }
            resolve(userModel)
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
user.registerUser = async (users) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            console.log(users.matkhau)
            let matkhau = await hashUsePassword(users.matkhau)
            console.log(matkhau)
            let loai = 1;
            const [result] = await pool.execute('insert into users(ten, email, matkhau, loai) values (?, ?, ?, ?)',
                [users.ten, users.email, matkhau, loai, hoatdong]);
            let id_users = result.insertId
            console.log('mã', id_users)
            userData = {
                errcode: 0,
                id_users: id_users,
                message: 'Đăng kí thành công'
            }
            resolve(userData)
            console.log(userData)
        } catch (e) {
            reject(e);
        }
    })
}

user.getAll = (page, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let limit = '5';
            let sql = "SELECT id, hinh,ten,email,loai FROM users";
            let sqlTotal = "SELECT COUNT(*) as total FROM users"
            if (name) {
                sqlTotal += " WHERE ten LIKE '%" + name + "%' "
            }

            const [counts] = await pool.execute(sqlTotal)
            let totalRow = counts[0].total
            let totalPage = Math.ceil(totalRow / limit)
            page = page > 0 ? Math.floor(page) : 1;
            page = page <= totalPage ? Math.floor(page) : totalPage;
            let start = (page - 1) * limit;
            start = start > 0 ? start : 0;
            if (name) {
                sql += " WHERE ten LIKE '%" + name + "%' "
            }
            const [rows, fields] = await pool.execute(sql + ' ' + 'order by id ASC LIMIT ' + start + ',' + limit)
            if (rows.length === 0) {
                data = {
                    totalPage,
                    name,
                    errcode: '1',
                    message: 'không có dữ liệu'
                }
            } else {
                data = {
                    rows,
                    totalPage,
                    name,
                    errcode: '0',
                    message: 'ok'
                }
            } resolve(data)
        } catch {
            reject(e)
        }
    })
}

user.getId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let usersModel = {}
            let sql = "SELECT ten, hinh, email, cambl, camdang, loai, diachi, sdt  FROM users WHERE id =?"
            const [result] = await pool.execute(sql, [id])
            let dataUser = result[0]
            if (dataUser) {
                usersModel = {
                    errcode: 0,
                    data: dataUser,
                }
            } else {
                usersModel = {
                    errcode: 1,
                    message: "tài khoản không tồn tại"
                }
            }
            resolve(usersModel)
        } catch (error) {
            reject(error)
        }
    })
}

user.UpdateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        let userData = {};
        try {
            await pool.execute('update users set hinh = ?, ten = ?, diachi = ? where id=?',
                [data.hinh, data.ten, data.diachi, data.id])
            userData = {
                errcode: 0
            }
            console.log("check user data update", userData)
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = user