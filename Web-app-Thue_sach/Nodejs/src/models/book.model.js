import { DATE } from "sequelize";
import pool from "../config/connectDB";

const book = function () { }

// hien thi ds sach chua dc duyet ben admin
book.getTrangthai0 = async (page, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let limit = '5';
            let sql = "SELECT sach.id,sach.hinh, sach.ten,sach.trangthai, tinhtrang, sach.loai,sach.danhgia,gia,theloai.ten as theloai, users.ten as nguoidang, tentacgia FROM sach";
            sql += " INNER JOIN theloai ON theloai.id=sach.theloai_id INNER JOIN users ON sach.id_users=users.id INNER JOIN tacgia ON sach.id_tacgia=tacgia.id "
            sql += " WHERE sach.trangthai=0 "
            let sqlTotal = "SELECT COUNT(*) as total FROM sach WHERE sach.trangthai=0"
            if (name) {
                sqlTotal += " AND sach.ten LIKE '%" + name + "%' "
            }
            const [counts] = await pool.execute(sqlTotal)
            let totalRow = counts[0].total
            let totalPage = Math.ceil(totalRow / limit)
            page = page > 0 ? Math.floor(page) : 1;
            page = page <= totalPage ? Math.floor(page) : totalPage;
            let start = (page - 1) * limit;
            start = start > 0 ? start : 0;
            if (name) {
                sql += " AND sach.ten LIKE '%" + name + "%' "
            }
            const [rows, fields] = await pool.execute(sql + ' ' + 'order by sach.ten ASC LIMIT ' + start + ',' + limit)
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
            }
            resolve(data)
        } catch (e) {
            reject(e);
        }
    })
}

book.getsachduyet = async (page, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let limit = '5';
            let sql = "SELECT sach.id,sach.hinh, sach.ten,sach.trangthai, tinhtrang, sach.loai,sach.danhgia,gia,theloai.ten as theloai, users.ten as nguoidang, tentacgia FROM sach";
            sql += " INNER JOIN theloai ON theloai.id=sach.theloai_id INNER JOIN users ON sach.id_users=users.id INNER JOIN tacgia ON sach.id_tacgia=tacgia.id "
            sql += " WHERE sach.trangthai=1 "
            let sqlTotal = "SELECT COUNT(*) as total FROM sach WHERE sach.trangthai=1"
            if (name) {
                sqlTotal += " AND sach.ten LIKE '%" + name + "%' "
            }
            const [counts] = await pool.execute(sqlTotal)
            let totalRow = counts[0].total
            let totalPage = Math.ceil(totalRow / limit)
            page = page > 0 ? Math.floor(page) : 1;
            page = page <= totalPage ? Math.floor(page) : totalPage;
            let start = (page - 1) * limit;
            start = start > 0 ? start : 0;
            if (name) {
                sql += " AND sach.ten LIKE '%" + name + "%' "
            }
            const [rows, fields] = await pool.execute(sql + ' ' + 'order by sach.ten ASC LIMIT ' + start + ',' + limit)
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
            }
            resolve(data)
        } catch (e) {
            reject(e);
        }
    })
}

// ds sách user
book.getTrangthai1 = (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let limit = 6;
            let data = {};
            let sql = "SELECT sach.id,sach.hinh, sach.ten,sach.trangthai, tinhtrang, sach.loai,sach.danhgia,gia,theloai.ten as theloai, users.ten as nguoidang, tentacgia FROM sach";
            sql += " INNER JOIN theloai ON theloai.id=sach.theloai_id INNER JOIN users ON sach.id_users=users.id INNER JOIN tacgia ON sach.id_tacgia=tacgia.id "
            sql += " WHERE sach.trangthai= 1"
            let sqlTotal = "SELECT COUNT(*) as total FROM sach WHERE sach.trangthai=1"
            let [counts] = await pool.execute(sqlTotal)
            let totalRow = counts[0].total
            let totalPage = Math.ceil(totalRow / limit)
            page = page > 0 ? Math.floor(page) : 1;
            page = page <= totalPage ? Math.floor(page) : totalPage;
            let start = (page - 1) * limit;
            let [rows, fields] = await pool.execute(sql + ' ' + 'order by sach.ten ASC LIMIT ' + start + ',' + limit)
            if (rows.length === 0) {
                data = {
                    totalPage,
                    errcode: '1',
                    message: 'không có dữ liệu'
                }
            } else {
                data = {
                    rows,
                    totalPage,
                    errcode: '0',
                    message: 'ok'
                }
            }
            resolve(data)
        } catch (e) {
            reject(e);
        }
    })
}

//them sach
book.create = (bookData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let sql0 = 'insert into sach(hinh, ten , trangthai, tinhtrang, loai,theloai_id, gia, tiencoc, id_tacgia, id_users ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            let sql1 = 'insert into sach(hinh, ten , trangthai, loai, theloai_id, id_tacgia, id_users ) values (?, ?, ?, ?, ?, ?, ?)';
            let trangthai = 0;

            if (bookData.loai == 0) {

                if (!bookData.hinh || !bookData.ten || !bookData.gia || !bookData.theloai_id || !bookData.tiencoc || !bookData.tentacgia || !bookData.id_users || !bookData.tinhtrang) {
                    data = {
                        errcode: 1,
                        message: 'không được để trống dữ liệu'
                    }
                } else {
                    let user = await checkuser(bookData.id_users)
                    if (user) {
                        data = {
                            errcode: 2,
                            message: 'người dùng không có quyền sử dụng chức năng này'
                        }
                    } else {
                        let dataAuthorID = await checkAuthor(bookData.tentacgia)
                        let id_tacgia = dataAuthorID;
                        await pool.execute(sql0, [bookData.hinh, bookData.ten, trangthai, bookData.tinhtrang, bookData.loai, bookData.theloai_id, bookData.gia, bookData.tiencoc, id_tacgia, bookData.id_users]);
                        data = {
                            errcode: 0,
                            message: 'Thêm sách thuê thành công vui lòng chờ Admin duyệt'
                        }
                    }
                }
            } else {
                if (!bookData.hinh || !bookData.ten || !bookData.theloai_id || !bookData.tentacgia || !bookData.id_users) {
                    data = {
                        errcode: 3,
                        message: 'không được để trống dữ liệu'
                    }
                } else {
                    let user = await checkuser(bookData.id_users)
                    if (user) {
                        data = {
                            errcode: 4,
                            message: 'người dùng không có quyền sử dụng chức năng này'
                        }
                    } else {
                        let dataAuthorID = await checkAuthor(bookData.tentacgia)
                        let id_tacgia = dataAuthorID;
                        await pool.execute(sql1, [bookData.hinh, bookData.ten, trangthai, bookData.loai, bookData.theloai_id, id_tacgia, bookData.id_users]);
                        data = {
                            errcode: 0,
                            message: 'Thêm sách đọc online thành công vui lòng chờ Admin duyệt'
                        }

                    }
                }
            }
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}

let checkuser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await pool.execute('SELECT trangthai FROM users where id= ?', [userId])
            let user = rows[0];
            console.log(user)
            if (user.trangthai == 1) {
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

// check tacgia va them tac gia
let checkAuthor = (tentacgia) => {
    return new Promise(async (resolve, reject) => {
        try {
            let author = {};
            let sql = 'SELECT id FROM tacgia where tentacgia= ?'
            const [rows, fields] = await pool.execute(sql, [tentacgia])
            let check = rows[0]
            if (check) {
                author = check.id
            } else {
                const [result] = await pool.execute('insert into tacgia(tentacgia) values (?)', [tentacgia])
                author = result.insertId
            }
            resolve(author)
        }
        catch (e) {
            reject(e);
        }
    });
}


book.getId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let sqlCheck = "select loai from sach where id =?"
            let sql = "SELECT sach.hinh,sach.ten,noidung,sach.id, sach.trangthai, tinhtrang, sach.loai,sach.danhgia, theloai.ten as theloai, users.ten as nguoidang, tentacgia";
            const [result] = await pool.execute(sqlCheck, [id])
            let check = result[0]
            if (check) {
                if (check.loai == 1) {
                    sql += " FROM sach"
                    sql += " INNER JOIN theloai ON theloai.id=sach.theloai_id "
                    sql += " INNER JOIN users ON sach.id_users=users.id "
                    sql += " INNER JOIN tacgia ON sach.id_tacgia=tacgia.id "
                    sql += " WHERE sach.id = ? "
                } else {
                    sql += ",gia,tiencoc"
                    sql += " FROM sach"
                    sql += " INNER JOIN theloai ON theloai.id=sach.theloai_id "
                    sql += " INNER JOIN users ON sach.id_users=users.id "
                    sql += " INNER JOIN tacgia ON sach.id_tacgia=tacgia.id "
                    sql += " WHERE sach.id = ? "
                }
                const [rows, fields] = await pool.execute(sql, [id])
                let book = rows[0]
                data = {
                    book,
                    errcode: 0,
                    message: "ok"
                }
            } else {
                data = {
                    errcode: 1,
                    message: "id không tồn tại"
                }
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}


book.updateTrangthai = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataBook = {};
            let trangthai = {};
            console.log("sv", id)
            const [rows, fields] = await pool.execute('SELECT * FROM sach where id= ?', [id])
            let check = rows[0]
            console.log(check)
            if (check) {
                if (check.trangthai == 1) {
                    trangthai = 0
                } else {
                    trangthai = 1
                }
                await pool.execute('update sach set trangthai = ? where id = ?',
                    [trangthai, id]);
                dataBook = {
                    errcode: 0,
                    message: 'Duyệt thành công'
                }
            } else {
                dataBook = {
                    errcode: 1,
                    message: 'id không tồn tại'
                }
            }
            resolve(dataBook)
        } catch (error) {
            reject(error)
        }
    })
}

book.message = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DataMsr = {}
            let ngaytao = new Date()
            console.log(ngaytao)
            let sql = "update sach set trangthai = ? where id = ?"
            let sqlMsg = "insert into thongbao(noidung, id_sach, ngaytao) values (?, ?, ?)"
            await pool.execute(sql, [data.trangthai, data.id])
            await pool.execute(sqlMsg, [data.noidung, data.id, ngaytao])
            DataMsr = {
                errcode: 0,
                message: 'thành công'
            }
            resolve(DataMsr)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = book;
