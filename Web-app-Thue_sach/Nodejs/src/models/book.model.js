
import pool from "../config/connectDB";

const book = function () { }

// hien thi ds sach bên admin
book.getApprovalStatus = async (page, name, trangthaiduyet) => {
    return new Promise(async (resolve, reject) => {
        try {

            let data = {};
            let limit = '5';
            let sql = "SELECT sach.id,sach.hinh,sach.noidung, sach.ten,sach.trangthai,trangthaiduyet, tinhtrang, sach.loai,gia,theloai.ten as theloai, users.ten as nguoidang, tentacgia FROM sach";
            sql += " INNER JOIN theloai ON theloai.id=sach.theloai_id INNER JOIN users ON sach.id_users=users.id INNER JOIN tacgia ON sach.id_tacgia=tacgia.id "
            sql += " WHERE sach.trangthaiduyet=? "
            let sqlTotal = "SELECT COUNT(*) as total FROM sach WHERE sach.trangthaiduyet=?"
            if (name) {
                sqlTotal += " AND sach.ten LIKE '%" + name + "%' "
            }
            const [counts] = await pool.execute(sqlTotal, [trangthaiduyet])
            let totalRow = counts[0].total
            let totalPage = Math.ceil(totalRow / limit)
            page = page > 0 ? Math.floor(page) : 1;
            page = page <= totalPage ? Math.floor(page) : totalPage;
            let start = (page - 1) * limit;
            start = start > 0 ? start : 0;
            if (name) {
                sql += " AND sach.ten LIKE '%" + name + "%' "
            }
            const [rows, fields] = await pool.execute(sql + ' ' + 'order by sach.ten ASC LIMIT ' + start + ',' + limit, [trangthaiduyet])
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
            let sql = "SELECT sach.id,ROUND(COALESCE(AVG(danhgia.danhgia), 0)) AS danhgia,sach.hinh,sach.noidung,sdt,users.diachi, sach.ten,sach.trangthai,trangthaithue, tiencoc, tinhtrang, sach.loai,gia,theloai.ten as theloai, users.ten as nguoidang, id_users, tentacgia FROM sach";
            sql += " INNER JOIN theloai ON theloai.id=sach.theloai_id INNER JOIN users ON sach.id_users=users.id INNER JOIN tacgia ON sach.id_tacgia=tacgia.id "
            sql += " LEFT JOIN danhgia ON danhgia.sach_id = sach.id "
            sql += " WHERE sach.trangthai= 1 AND trangthaiduyet ='duocduyet' GROUP BY sach.id"
            let sqlTotal = "SELECT COUNT(*) as total FROM sach WHERE sach.trangthai=1 AND trangthaiduyet ='duocduyet'"
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

book.getBookByCatetoryAndAuthor = (theloai_id, loai, ten) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let sql = "SELECT sach.id,sach.hinh,masach,ROUND(COALESCE(AVG(danhgia.danhgia), 0)) AS danhgia, sach.ten,sach.trangthai,trangthaithue, tiencoc, tinhtrang, sach.loai,gia,theloai.ten as theloai, users.ten as nguoidang, id_users, tentacgia FROM sach";
            sql += " INNER JOIN theloai ON theloai.id=sach.theloai_id INNER JOIN users ON sach.id_users=users.id INNER JOIN tacgia ON sach.id_tacgia=tacgia.id "
            sql += " LEFT JOIN danhgia ON danhgia.sach_id = sach.id"
            sql += " WHERE sach.trangthai= 1 AND trangthaiduyet ='duocduyet'"
            if (theloai_id) {
                sql += ` AND theloai_id=${theloai_id}`
            }
            if (loai) {
                sql += ` AND sach.loai=${loai}`
            }
            if (ten) {
                sql += ` AND (sach.ten LIKE '%${ten}%' OR tentacgia LIKE '%${ten}%')`
            }
            sql += " GROUP BY sach.id"
            let [rows, fields] = await pool.execute(sql)
            if (rows.length === 0) {
                data = {
                    errcode: 1,
                    message: 'không có dữ liệu'
                }
            } else {
                data = {
                    rows,
                    errcode: 0,
                }
            }
            resolve(data)
        } catch (e) {
            reject(e);
        }
    })
}

let generateRandomCode = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//them sach
book.create = (bookData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let masach = "ms" + generateRandomCode(10)
            let sql0 = 'insert into sach(hinh, ten ,masach, trangthai, tinhtrang, loai,theloai_id, gia, tiencoc, id_tacgia, id_users,noidung ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)';
            let sql1 = 'insert into sach(hinh, ten ,masach, trangthai, loai, theloai_id, id_tacgia, id_users,noidung ) values (?, ?, ?, ?, ?, ?, ?, ?,?)';
            let trangthai = 1;
            if (bookData.loai == 0) {
                let checkPhone = await book.checkPhoneNumberUsers(bookData.id_users)
                if (checkPhone) {
                    if (!bookData.hinh || !bookData.ten || !bookData.gia || !bookData.theloai_id || !bookData.tiencoc || !bookData.tentacgia || !bookData.id_users || !bookData.tinhtrang || !bookData.noidung) {
                        data = {
                            errcode: 1,
                            message: 'không được để trống dữ liệu'
                        }
                    } else {
                        let user = await checkuser(bookData.id_users)
                        if (user) {
                            data = {
                                errcode: 2,
                                message: 'Bạn đã bị cấm đăng sách'
                            }
                        } else {
                            let dataAuthorID = await checkAuthor(bookData.tentacgia)
                            let id_tacgia = dataAuthorID;
                            await pool.execute(sql0, [bookData.hinh, bookData.ten, masach, trangthai, bookData.tinhtrang, bookData.loai, bookData.theloai_id, bookData.gia, bookData.tiencoc, id_tacgia, bookData.id_users, bookData.noidung]);
                            data = {
                                errcode: 0,
                                message: 'Thêm sách thuê thành công vui lòng chờ Admin duyệt'
                            }
                        }
                    }
                } else {
                    data = {
                        errcode: 5,
                        message: 'Vui lòng cập nhập thông tin liên lạc trước khi thêm sách cho thuê'
                    }
                }
            } else {
                if (!bookData.hinh || !bookData.ten || !bookData.theloai_id || !bookData.tentacgia || !bookData.id_users || !bookData.noidung) {
                    data = {
                        errcode: 3,
                        message: 'không được để trống dữ liệu'
                    }
                } else {
                    let user = await checkuser(bookData.id_users)
                    if (user) {
                        data = {
                            errcode: 4,
                            message: 'Bạn đã bị cấm đăng sách'
                        }
                    } else {
                        let dataAuthorID = await checkAuthor(bookData.tentacgia)
                        let id_tacgia = dataAuthorID;
                        await pool.execute(sql1, [bookData.hinh, bookData.ten, masach, trangthai, bookData.loai, bookData.theloai_id, id_tacgia, bookData.id_users, bookData.noidung]);
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

book.checkPhoneNumberUsers = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await pool.execute('SELECT sdt,diachi FROM users where id =?', [id])
            let users = rows[0];
            if (users.sdt.length > 0 && users.diachi.length) {
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

let checkuser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await pool.execute('SELECT camdang FROM users where id= ?', [userId])
            let user = rows[0];
            if (user.camdang == 1) {
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
            let data1 = tentacgia.trim();
            let data2 = data1.replace(/\s+/g, ' ');
            let sql = 'SELECT id FROM tacgia where tentacgia= ?'
            const [rows, fields] = await pool.execute(sql, [data2])
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
            let sql = "SELECT sach.hinh,ROUND(COALESCE(AVG(danhgia.danhgia), 0)) AS danhgia,sach.ten,noidung,users.sdt,users.diachi, sach.id,masach,trangthaithue, sach.trangthai,trangthaiduyet, tinhtrang, sach.loai, theloai.ten as theloai, users.ten as nguoidang, tentacgia";
            const [result] = await pool.execute(sqlCheck, [id])
            let check = result[0]
            if (check) {
                if (check.loai == 1) {
                    sql += " FROM sach"
                    sql += " INNER JOIN theloai ON theloai.id=sach.theloai_id "
                    sql += " INNER JOIN users ON sach.id_users=users.id "
                    sql += " INNER JOIN tacgia ON sach.id_tacgia=tacgia.id "
                    sql += " LEFT JOIN danhgia ON danhgia.sach_id = sach.id"
                    sql += " WHERE sach.id = ?  GROUP BY sach.id"
                } else {
                    sql += ",gia,tiencoc"
                    sql += " FROM sach"
                    sql += " INNER JOIN theloai ON theloai.id=sach.theloai_id "
                    sql += " INNER JOIN users ON sach.id_users=users.id "
                    sql += " INNER JOIN tacgia ON sach.id_tacgia=tacgia.id "
                    sql += " LEFT JOIN danhgia ON danhgia.sach_id = sach.id"
                    sql += " WHERE sach.id = ?  GROUP BY sach.id"
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


book.updateApprovalStatus = (id, trangthaiduyet) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataBook = {};
            const [result, fields] = await pool.execute('update sach set trangthaiduyet = ? where id = ?',
                [trangthaiduyet, id]);
            if (result) {
                dataBook = {
                    errcode: 0,
                    message: 'Duyệt thành công'
                }
            } else {
                dataBook = {
                    errcode: 1,
                    message: 'Duyệt thất bại'
                }
            }
            resolve(dataBook)
        } catch (error) {
            reject(error)
        }
    })
}

book.createMessage = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DataMsr = {}
            let ngaytao = new Date()
            let sql = "update sach set trangthaiduyet = ? where id = ?"
            let sqlMsg = "insert into thongbao(noidung, id_sach, ngaytao) values (?, ?, ?)"
            await pool.execute(sql, [data.trangthaiduyet, data.id])
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

//thêm chương cho sách đọc
book.createChap = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataChapter = {}
            let sqlCheck = "select * from sach where id =? and loai = 1 "
            let sqlChapter = "insert into noidungsach(chuong, noidung, sach_id) values (?, ?, ?)"
            const [check] = await pool.execute(sqlCheck, [data.sach_id])
            const dataCheck = check[0]
            if (dataCheck) {
                const [result, fields] = await pool.execute(sqlChapter, [data.chuong, data.noidung, data.sach_id])
                if (fields) {
                    dataChapter = {
                        errcode: 1,
                        message: "Thất bại"
                    }
                } else {
                    dataChapter = {
                        errcode: 0,
                        message: "Thành công"
                    }
                }
            } else {
                dataChapter = {
                    errcode: 2,
                    message: "không tìm thấy"
                }
            }
            resolve(dataChapter)
        } catch (error) {
            reject(error)
        }
    })
}

book.update = (data, hinhmoi) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookModel = {}
            let sqlCheck = "SELECT sach.id FROM sach WHERE sach.id =? AND trangthaithue = 'dangthue'"
            let sqlUpdate = "UPDATE sach SET hinh=?,ten=?, trangthai=?, gia=?, tiencoc=?, noidung =? WHERE id= ?"
            const [check, fields] = await pool.execute(sqlCheck, [data.id])
            if (check.length > 0) {
                bookModel = {
                    errcode: 1,
                    message: "không thể cập nhật quyển sách này do đang trong quá trình thuê"
                }
            }
            else {
                const [result, fields] = await pool.execute(sqlUpdate, [hinhmoi, data.ten, data.trangthai, data.gia, data.tiencoc, data.noidung, data.id])
                if (result) {
                    bookModel = {
                        errcode: 0,
                        message: "Cập nhập thành công"
                    }
                } else {
                    bookModel = {
                        errcode: 2,
                        message: "cập nhật thất bại"
                    }
                }
            }
            resolve(bookModel)
        } catch (error) {
            reject(error)
        }
    })
}


book.updateBookOnline = (data, hinhmoi) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookModel = {}
            let sqlUpdate = "UPDATE sach SET hinh=?,ten=?, trangthai =?, noidung =? WHERE id =?"
            const [result, fields] = await pool.execute(sqlUpdate, [hinhmoi, data.ten, data.trangthai, data.noidung, data.id])
            if (result) {
                bookModel = {
                    errcode: 0,
                    message: "Cập nhập thành công"
                }
            } else {
                bookModel = {
                    errcode: 2,
                    message: "cập nhật thất bại"
                }
            }
            resolve(bookModel)
        } catch (error) {
            reject(error)
        }
    })
}

book.getBookUnapprovedByIdUsers = async (id_users, loai) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let sql = "SELECT sach.id,sach.hinh,ROUND(COALESCE(AVG(danhgia.danhgia), 0)) AS danhgia, sach.ten,sach.trangthai,trangthaiduyet,sach.noidung,id_users, tinhtrang, sach.loai,gia,theloai.ten as theloai, users.ten as nguoidang, tentacgia FROM sach";
            sql += " INNER JOIN theloai ON theloai.id=sach.theloai_id INNER JOIN users ON sach.id_users=users.id INNER JOIN tacgia ON sach.id_tacgia=tacgia.id "
            sql += " LEFT JOIN danhgia ON danhgia.sach_id = sach.id"
            sql += " WHERE id_users=? AND sach.loai=? AND (trangthaiduyet='khongduyet') GROUP BY sach.id"
            const [rows, fields] = await pool.execute(sql, [id_users, loai])
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
            }
            resolve(data)
        } catch (e) {
            reject(e);
        }
    })
}

book.getBookByIdUsers = async (id_users, loai) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let sql = "SELECT sach.id,sach.hinh,ROUND(COALESCE(AVG(danhgia.danhgia), 0)) AS danhgia, sach.ten,sach.trangthai,trangthaiduyet,sach.noidung,id_users, tinhtrang, sach.loai,gia,theloai.ten as theloai, users.ten as nguoidang, tentacgia FROM sach";
            sql += " INNER JOIN theloai ON theloai.id=sach.theloai_id INNER JOIN users ON sach.id_users=users.id INNER JOIN tacgia ON sach.id_tacgia=tacgia.id "
            sql += " LEFT JOIN danhgia ON danhgia.sach_id = sach.id"
            sql += " WHERE id_users=? AND sach.loai=? AND (trangthaiduyet='choduyet' OR trangthaiduyet='duocduyet') GROUP BY sach.id"
            const [rows, fields] = await pool.execute(sql, [id_users, loai])
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
            }
            resolve(data)
        } catch (e) {
            reject(e);
        }
    })
}

book.getBookMessage = async (id_sach) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            let sql = "SELECT thongbao.noidung FROM thongbao WHERE id_sach ORDER BY thongbao.ngaytao DESC LIMIT 1"
            const [rows, fields] = await pool.execute(sql, [id_sach])
            let dataRow = rows[0]
            if (dataRow) {
                data = {
                    dataRow,
                    errcode: '0',
                    message: 'không có dữ liệu'
                }
            } else {
                data = {
                    errcode: '1',
                    message: 'không có dữ liệu'
                }
            }
            resolve(data)
        } catch (e) {
            reject(e);
        }
    })
}


book.rating = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRating = {};
            let sqlCheck = `SELECT id FROM danhgia WHERE users_id=?`
            const [check] = await pool.execute(sqlCheck, [data.users_id])
            if (check[0]) {
                let sql = `UPDATE danhgia SET danhgia=? WHERE id =?`
                const [result, fields] = await pool.execute(sql, [data.danhgia, check[0].id])
                if (result) {
                    dataRating = {
                        errcode: '0',
                        message: 'thêm đánh giá thành công'
                    }
                } else {
                    dataRating = {
                        errcode: '1',
                        message: 'đánh giá thất bại'
                    }
                }
            } else {
                let sql = `INSERT INTO danhgia(danhgia,sach_id,users_id) VALUES(?,?,?)`
                const [result, fields] = await pool.execute(sql, [data.danhgia, data.sach_id, data.users_id])
                if (result) {
                    dataRating = {
                        errcode: '0',
                        message: 'thêm đánh giá thành công'
                    }
                } else {
                    dataRating = {
                        errcode: '1',
                        message: 'đánh giá thất bại'
                    }
                }
            }
            resolve(dataRating)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = book;
