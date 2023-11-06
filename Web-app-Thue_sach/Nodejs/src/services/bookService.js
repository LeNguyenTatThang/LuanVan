import pool from "../config/connectDB";

// hien thi ds sach chua dc duyet ben admin
let getAllBook = async (page, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let limit = '5';
            let sql = "SELECT sach.ten,sach.trangthai,sach.loai,sach.danhgia,gia,theloai.ten as theloai, users.ten as nguoidang, tentacgia FROM sach";
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

//them sach
let createBook = (book) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let sql0 = 'insert into sach(hinh, ten , trangthai,loai,theloai_id, gia, tiencoc, id_tacgia, id_users ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            let sql1 = 'insert into sach(hinh, ten , trangthai,loai,theloai_id, id_tacgia, id_users ) values (?, ?, ?, ?, ?, ?, ?)';
            let trangthai = 0;
            if (book.loai == 0) {
                if (!book.hinh || !book.ten || !book.gia || !book.theloai_id || !book.tiencoc || !book.tentacgia || !book.id_user) {
                    data = {
                        errcode: 1,
                        message: 'không được để trống dữ liệu'
                    }
                } else {
                    let user = await checkuser(book.id_user)
                    if (user) {
                        data = {
                            errcode: 2,
                            message: 'người dùng không có quyền sử dụng chức năng này'
                        }
                    } else {
                        let dataAuthorID = await checkAuthor(book.tentacgia)
                        let id_tacgia = dataAuthorID;
                        await pool.execute(sql0, [book.hinh, book.ten, trangthai, book.loai, book.theloai_id, book.gia, book.tiencoc, id_tacgia, book.id_user]);
                        data = {
                            errcode: 0,
                            message: 'Thêm sách thuê thành công vui lòng chờ Admin duyệt'
                        }
                    }
                }
            } else {
                if (!book.hinh || !book.ten || book.theloai_id || !book.tentacgia || !book.id_user) {
                    data = {
                        errcode: 3,
                        message: 'không được để trống dữ liệu'
                    }
                } else {
                    let user = await checkuser(book.id_user)
                    if (user) {
                        data = {
                            errcode: 4,
                            message: 'người dùng không có quyền sử dụng chức năng này'
                        }
                    } else {
                        let dataAuthorID = await checkAuthor(book.tentacgia)
                        let id_tacgia = dataAuthorID;
                        await pool.execute(sql1, [book.hinh, book.ten, trangthai, book.loai, book.theloai_id, id_tacgia, book.id_user]);
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
            const [rows, fields] = await pool.execute('SELECT loai FROM users where id= ?', [userId])
            let user = rows[0];
            if (user.loai == 2) {
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

module.exports = {
    getAllBook, createBook
}