import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
import pool from "../config/connectDB";

const user = function () { }


user.handleUserLogin = (email, matkhau) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isCheck = await user.checkEmail(email);
            if (isCheck) {
                let check = await user.checkVerification(email)
                if (check) {
                    userData.errcode = 6;
                    userData.errMessage = "email này chưa xác thực";
                } else {
                    const [rows, fields] = await pool.execute('SELECT id,ten,hinh,diachi,sdt, email,matkhau FROM users where email= ?', [email])
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

user.checkNameUssers = (ten) => {
    return new Promise(async (resolve, reject) => {
        try {
            let ten1 = ten.trim();
            let ten2 = ten1.replace(/\s+/g, ' ');
            const [rows, fields] = await pool.execute('SELECT * FROM users where ten= ?', [ten2])
            let users = rows[0];
            if (users) {
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

user.checkVerification = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM users where email= ? AND xacthuctaikhoan = 0', [email])
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

//cập nhật trạng thái cấm binh luận và bỏ cấm
user.updatedisableCommentsUsers = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("du lieu", data)
            let userModel = {}
            let sql = "UPDATE users SET cambl=? WHERE id=?"
            const [result, fields] = await pool.execute(sql, [data.cambl, data.id])
            if (result) {
                userModel = {
                    errcode: 0,
                    message: "thành công"
                }
            } else {
                userModel = {
                    errcode: 1,
                    message: "thất bại"
                }
            }
            resolve(userModel)
        } catch (error) {
            reject(error)
        }
    })
}

//cấm người dùng đăng sách và bỏ cấm
user.DisableBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userModel = {}
            let sql = "UPDATE users SET camdang=? WHERE id=?"
            const [result, fields] = await pool.execute(sql, [data.camdang, data.id])
            if (result) {
                userModel = {
                    errcode: 0,
                    message: "thành công"
                }
            } else {
                userModel = {
                    errcode: 1,
                    message: "thất bại"
                }
            }
            resolve(userModel)
        } catch (error) {
            reject(error)
        }
    })
}


user.rentalBanFee = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userModel = {}
            let sql = "UPDATE users SET camthue=? WHERE id=?"
            const [result, fields] = await pool.execute(sql, [data.camthue, data.id])
            if (result) {
                userModel = {
                    errcode: 0,
                    message: "thành công"
                }
            } else {
                userModel = {
                    errcode: 1,
                    message: "thất bại"
                }
            }
            resolve(userModel)
        } catch (error) {
            reject(error)
        }
    })
}

user.checkUserRentalBan = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await pool.execute('SELECT id FROM users where id= ? AND camthue = 1', [id])
            let users = rows[0];
            if (users) {
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
user.registerUser = async (users) => {
    return new Promise(async (resolve, reject) => {
        try {
            let ngaytao = new Date()
            let userData = {};
            console.log(users.matkhau)
            let matkhau = await hashUsePassword(users.matkhau)
            console.log(matkhau)
            let loai = 1;
            const [result] = await pool.execute('insert into users(ten, email, matkhau, loai,ngaytao) values (?, ?, ?, ?,?)',
                [users.ten, users.email, matkhau, loai, ngaytao]);
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
            let sql = "SELECT id, hinh,ten,email,loai FROM users WHERE loai =1";
            let sqlTotal = "SELECT COUNT(*) as total FROM users WHERE loai =1"
            if (name) {
                sqlTotal += " AND ten LIKE '%" + name + "%'"
            }
            const [counts] = await pool.execute(sqlTotal)
            let totalRow = counts[0].total
            let totalPage = Math.ceil(totalRow / limit)
            page = page > 0 ? Math.floor(page) : 1;
            page = page <= totalPage ? Math.floor(page) : totalPage;
            let start = (page - 1) * limit;
            start = start > 0 ? start : 0;
            if (name) {
                sql += " AND ten LIKE '%" + name + "%'"
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

user.getYear = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let sql = "SELECT id, YEAR(ngaytao) AS nam FROM users WHERE loai =1 GROUP BY nam";
            const [rows, fields] = await pool.execute(sql)
            if (rows.length === 0) {
                data = {
                    errcode: '1',
                    message: 'không có dữ liệu'
                }
            } else {
                data = {
                    rows,
                    errcode: '0',
                    message: 'ok'
                }
            } resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

user.getUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let sql = "SELECT id, ten FROM users WHERE loai =1";
            const [rows, fields] = await pool.execute(sql)
            if (rows.length === 0) {
                data = {
                    errcode: '1',
                    message: 'không có dữ liệu'
                }
            } else {
                data = {
                    rows,
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
            let sql = "SELECT id, ten, hinh, email, cambl,camthue, camdang, loai, diachi, sdt  FROM users WHERE id =?"
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

user.UpdateUser = (data, hinhmoi) => {
    return new Promise(async (resolve, reject) => {
        let userData = {};
        try {
            let check = await user.checkNameUpdate(data)
            if (check) {
                userData = {
                    errcode: 1,
                    message: 'tên tài khoản này đã tồn tại'
                }
            } else {
                await pool.execute('update users set hinh = ?,sdt =?, ten = ?, diachi = ? where id=?',
                    [hinhmoi, data.sdt, data.ten, data.diachi, data.id])
                userData = {
                    errcode: 0,
                    message: 'cập nhập thành công'
                }
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

user.checkPhoneNumber = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await pool.execute('SELECT sdt FROM users where sdt= ? AND id !=?', [data.sdt, data.id])
            let users = rows[0];
            if (users) {
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

user.checkNameUpdate = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let ten1 = data.ten.trim();
            let ten2 = ten1.replace(/\s+/g, ' ');
            const [rows, fields] = await pool.execute('SELECT * FROM users where ten= ? AND id !=?', [ten2, data.id])
            let users = rows[0];
            if (users) {
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

user.newAccountStatistics = (nam) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let sql = `SELECT YEAR(ngaytao) AS nam, MONTH(ngaytao) AS thang,
                        COUNT(*) AS taikhoanmoi
                        FROM users`
            if (nam) {
                sql += ` WHERE YEAR(ngaytao) = ${nam}`
            }
            sql += ` GROUP BY YEAR(ngaytao), MONTH(ngaytao)
                        ORDER BY nam, thang`
            let [rows, fields] = await pool.execute(sql)
            if (rows.length > 0) {
                userData = {
                    rows,
                    errcode: 0
                }
            } else {
                userData = {
                    message: 'không có data',
                    errcode: 1
                }
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = user