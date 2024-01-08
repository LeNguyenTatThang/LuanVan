import pool from "../config/connectDB";
const nodemailer = require('nodemailer');
const rental = function () { }


let generateRandomCode = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}



rental.create = function (data) {
    return new Promise(async (resolve, reject) => {
        try {
            let maphieu = generateRandomCode(8)
            let dataRental = {}
            let trangthai = 0;
            let sqlRental = 'insert into phieuthue(users_id, chutiem_id, tongtien, diachi, ngaythue, trangthai, maphieu,sdt) values (?,?,?,?,?,?,?,?)'
            let sqlRental_Book = 'insert into phieuthue_sach(sach_id, phieuthue_id) VALUES (?, ?)'
            let bookIds = Array.isArray(data.sach_id) ? data.sach_id : [data.sach_id];
            let checkedBooks = [];
            for (let bookId of bookIds) {
                let check = await checkbook(bookId)
                if (check) {
                    checkedBooks.push({ id: bookId, tensach: check });
                }
            }
            if (checkedBooks.length > 0) {
                dataRental = {
                    errcode: 1,
                    message: `Quyển sách ${checkedBooks.map(book => `"${book.tensach}"`)} đã được thuê không thể thuê được`
                }
            } else {
                const [result] = await pool.execute(sqlRental, [data.users_id, data.chutiem_id, data.tongtien, data.diachi, data.ngaythue, trangthai, maphieu, data.sdt])
                let phieuthue_id = result.insertId;
                for (let bookId of bookIds) {
                    await pool.execute(sqlRental_Book, [bookId, phieuthue_id]);
                    let sqlUpdate = `UPDATE sach SET trangthaithue = 'dangthue' WHERE id=?`
                    const [result, fields] = await pool.execute(sqlUpdate, [bookId])
                    if (result) {

                    }
                }
                dataRental = {
                    errcode: 0,
                    message: 'thành công'
                }
            }
            resolve(dataRental)
        } catch (e) {
            reject(e);
        }
    })
}

let checkbook = (sach_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sqlCheck = "SELECT sach.ten FROM sach WHERE sach.id = ? AND trangthaithue = 'dangthue'"
            const [result, fields] = await pool.execute(sqlCheck, [sach_id])
            if (result.length > 0) {
                const tenSach = result[0].ten;
                resolve(tenSach);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
}

//xác nhận cho thuê sách và chuyển sang chờ gửi
rental.upStatus1 = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {};
            let trangthai = 1;
            let sqlRental = 'UPDATE phieuthue set trangthai = ? WHERE id = ?'
            let check = await checkRental(data.id)
            if (check) {
                const [result, fields] = await pool.execute(sqlRental, [trangthai, data.id])
                if (result) {
                    dataRental = {
                        errcode: 0,
                        message: 'thành công'
                    }
                } else {
                    dataRental = {
                        errcode: 1,
                        message: 'thất bại'
                    }
                }
            } else {
                dataRental = {
                    errcode: 2,
                    message: 'phiếu thuê không tồn tại'
                }
            }
            console.log(dataRental)
            resolve(dataRental)
        } catch (e) {
            reject(e);
        }
    })
}

let checkRental = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM phieuthue where id= ?', [id])
            let rental = rows[0];
            if (rental) {
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





//xác nhận đã nhận và chuyển sang đang thuê
rental.upStatus2 = (data, ngaynhan, ngaytra) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {}
            let trangthai = 2;
            let sqlRental = 'UPDATE phieuthue set trangthai = ?, ngaynhan = ?, ngaytra = ? WHERE id = ?'
            let check = await checkRental(data.id)
            if (check) {
                const [result, fields] = await pool.execute(sqlRental, [trangthai, ngaynhan, ngaytra, data.id])
                if (result) {
                    dataRental = {
                        errcode: 0,
                        message: 'thành công'
                    }
                } else {
                    dataRental = {
                        errcode: 1,
                        message: 'thất bại'
                    }
                }
            } else {
                dataRental = {
                    errcode: 2,
                    message: 'phiếu thuê không tồn tại'
                }
            }
            resolve(dataRental)
        } catch (e) {
            reject(e);
        }
    })
}




//trả hàng 
rental.upStatus3 = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {};
            let trangthai = 3;
            let sqlRental = 'UPDATE phieuthue set trangthai = ? WHERE id = ?'
            let check = await checkRental(id)
            if (check) {
                const [result, fields] = await pool.execute(sqlRental, [trangthai, id])
                if (result) {
                    dataRental = {
                        errcode: 0,
                        message: 'thành công'
                    }
                } else {
                    dataRental = {
                        errcode: 1,
                        message: 'thất bại'
                    }
                }
            } else {
                dataRental = {
                    errcode: 2,
                    message: 'phiếu thuê không tồn tại'
                }
            }
            console.log(dataRental)
            resolve(dataRental)
        } catch (e) {
            reject(e);
        }
    })
}

//hoàn tất đơn hàng cho thuê
rental.upStatus4 = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {};
            let trangthai = 4;
            let sqlRental = 'UPDATE phieuthue set trangthai = ? WHERE id = ?'
            let sqlRental_book = "SELECT sach_id FROM phieuthue_sach WHERE phieuthue_id = ? "
            let check = await checkRental(data.id)
            if (check) {
                const [result, fields] = await pool.execute(sqlRental, [trangthai, data.id])
                if (result) {
                    const [rows, fields] = await pool.execute(sqlRental_book, [data.id])
                    if (rows) {
                        for (let bookId of rows) {
                            let sqlUpdate = 'UPDATE sach SET trangthaithue = ? WHERE id=?'
                            const [updeteBook] = await pool.execute(sqlUpdate, ['chuathue', bookId.sach_id])
                            if (updeteBook) {
                                dataRental = {
                                    errcode: 0,
                                    message: 'thành công'
                                }
                            } else {
                                dataRental = {
                                    errcode: 3,
                                    message: 'thất bại'
                                }
                            }
                        }
                    } else {
                        dataRental = {
                            errcode: 2,
                            message: 'thất bại'
                        }
                    }
                } else {
                    dataRental = {
                        errcode: 1,
                        message: 'thất bại'
                    }
                }
            } else {
                dataRental = {
                    errcode: 2,
                    message: 'phiếu thuê không tồn tại'
                }
            }
            console.log(dataRental)
            resolve(dataRental)
        } catch (e) {
            reject(e);
        }
    })
}


//hủy phiếu thuê
rental.upStatus5 = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {};
            let trangthai = 5;
            let sqlRental = 'UPDATE phieuthue set trangthai = ? WHERE id = ?'
            let sqlRental_book = "SELECT sach_id FROM phieuthue_sach WHERE phieuthue_id = ? "
            let check = await checkRental(data.id)
            if (check) {
                const [result, fields] = await pool.execute(sqlRental, [trangthai, data.id])
                if (result) {
                    const [rows, fields] = await pool.execute(sqlRental_book, [data.id])
                    if (rows) {
                        for (let bookId of rows) {
                            let sqlUpdate = 'UPDATE sach SET trangthaithue = ? WHERE id=?'
                            const [updeteBook] = await pool.execute(sqlUpdate, ['chuathue', bookId.sach_id])
                            if (updeteBook) {
                                dataRental = {
                                    errcode: 0,
                                    message: 'thành công'
                                }
                            } else {
                                dataRental = {
                                    errcode: 3,
                                    message: 'thất bại'
                                }
                            }
                        }
                    } else {
                        dataRental = {
                            errcode: 2,
                            message: 'thất bại'
                        }
                    }
                } else {
                    dataRental = {
                        errcode: 1,
                        message: 'thất bại'
                    }
                }
            } else {
                dataRental = {
                    errcode: 2,
                    message: 'phiếu thuê không tồn tại'
                }
            }
            console.log(dataRental)
            resolve(dataRental)
        } catch (e) {
            reject(e);
        }
    })
}

//danh sach đơn hàng thuê
rental.getRent = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {};
            let sqlRental = 'select phieuthue.id,maphieu,phieuthue.diachi AS diachinguoithue,chutiem_sach.diachi AS diachinguoidang, phieuthue.thongbao, GROUP_CONCAT(sach.ten) AS tensach ,GROUP_CONCAT(masach) AS masach ,nguoithue_phieuthue.ten AS nguoithue,phieuthue.sdt AS sdtnguoithue ,ngaythue, ngaynhan, ngaytra, GROUP_CONCAT(sach.tiencoc) AS tiencoc, chutiem_sach.ten as nguoidang,chutiem_sach.sdt AS sdtnguoidang, tongtien from phieuthue'
            sqlRental += ' INNER JOIN phieuthue_sach on phieuthue.id = phieuthue_sach.phieuthue_id'
            sqlRental += ' INNER JOIN sach on phieuthue_sach.sach_id = sach.id '
            sqlRental += ' INNER JOIN users AS nguoithue_phieuthue on phieuthue.users_id = nguoithue_phieuthue.id '
            sqlRental += ' INNER JOIN users AS chutiem_sach on sach.id_users = chutiem_sach.id '
            sqlRental += 'Where users_id = ? and phieuthue.trangthai = ? GROUP BY phieuthue_id'
            const [rows, fields] = await pool.execute(sqlRental, [data.users_id, data.trangthai])
            let dataRow = rows
            if (dataRow.length > 0) {
                dataRental = {
                    data: dataRow,
                    errcode: 0,
                    message: 'ok'
                }
            } else {
                dataRental = {
                    errcode: 1,
                    message: 'không có data'
                }
            }
            resolve(dataRental)
        } catch (e) {
            reject(e);
        }
    })
}

rental.getRenalByIdRental = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {};
            let sqlRental = 'select phieuthue.id,chutiem_sach.diachi AS diachinguoidang, phieuthue.diachi AS diachinguoithue, phieuthue.maphieu,GROUP_CONCAT(sach.id) AS sach_id, GROUP_CONCAT(masach) AS masach ,GROUP_CONCAT(sach.hinh) AS hinh, GROUP_CONCAT(sach.ten) AS tensach,GROUP_CONCAT(sach.gia) AS gia, GROUP_CONCAT(sach.tiencoc) AS tiencoc , nguoithue_phieuthue.ten AS nguoithue,phieuthue.sdt AS sdtnguoithue, chutiem_sach.ten AS nguoidang, ngaythue,nguoithue_phieuthue.email,chutiem_sach.sdt AS sdtnguoidang, ngaynhan, ngaytra, tongtien,phieuthue.trangthai FROM phieuthue'
            sqlRental += ' INNER JOIN phieuthue_sach ON phieuthue.id = phieuthue_sach.phieuthue_id'
            sqlRental += ' INNER JOIN sach ON phieuthue_sach.sach_id = sach.id '
            sqlRental += ' INNER JOIN users AS nguoithue_phieuthue ON phieuthue.users_id = nguoithue_phieuthue.id '
            sqlRental += ' INNER JOIN users AS chutiem_sach ON sach.id_users = chutiem_sach.id '
            sqlRental += ' WHERE phieuthue.id= ? GROUP BY phieuthue_id'
            const [rows, fields] = await pool.execute(sqlRental, [id])
            let dataRow = rows[0]
            if (dataRow) {
                const books = dataRow.sach_id.split(',').map((id, index) => ({
                    id: id,
                    hinh: dataRow.hinh.split(',')[index],
                    tensach: dataRow.tensach.split(',')[index],
                    gia: dataRow.gia.split(',')[index],
                    tiencoc: dataRow.tiencoc.split(',')[index],
                }));
                dataRental = {
                    books: books,
                    data: dataRow,
                    errcode: 0,
                }
            } else {
                dataRental = {
                    errcode: 1,
                    message: 'không có data'
                }
            }
            resolve(dataRental)
        } catch (e) {
            reject(e);
        }
    })
}

rental.updateMessage = (id, thongbao) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {};
            let sql = ' UPDATE phieuthue SET thongbao=? WHERE id=? '
            const [result, fields] = await pool.execute(sql, [thongbao, id])
            if (result) {
                dataRental = {
                    errcode: 0
                }
            } else {
                dataRental = {
                    errcode: 1
                }
            }
            resolve(dataRental)
        } catch (error) {
            reject(error)
        }
    })
}


//danh sach đơn hàng cho thuê
rental.getRentOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {};
            let sqlRental = 'select phieuthue.id,maphieu,phieuthue.thongbao,phieuthue.diachi AS diachinguoithue, GROUP_CONCAT(sach.ten) AS tensach,GROUP_CONCAT(masach) AS masach , GROUP_CONCAT(sach.tiencoc) AS tiencoc , nguoithue_phieuthue.ten AS nguoithue,chutiem_sach.ten AS nguoidang,ngaythue, ngaynhan, ngaytra,chutiem_sach.sdt AS sdtnguoidang,phieuthue.sdt AS sdtnguoithue,chutiem_sach.diachi AS diachinguoidang, tongtien FROM phieuthue'
            sqlRental += ' INNER JOIN phieuthue_sach ON phieuthue.id = phieuthue_sach.phieuthue_id'
            sqlRental += ' INNER JOIN sach ON phieuthue_sach.sach_id = sach.id '
            sqlRental += ' INNER JOIN users AS nguoithue_phieuthue ON phieuthue.users_id = nguoithue_phieuthue.id '
            sqlRental += ' INNER JOIN users AS chutiem_sach ON sach.id_users = chutiem_sach.id '
            sqlRental += ' WHERE chutiem_id = ? AND phieuthue.trangthai = ? GROUP BY phieuthue_id'
            const [rows, fields] = await pool.execute(sqlRental, [data.chutiem_id, data.trangthai])
            let dataRow = rows
            if (dataRow.length > 0) {
                dataRental = {
                    data: dataRow,
                    errcode: 0,
                    message: 'ok'
                }
            } else {
                dataRental = {
                    errcode: 1,
                    message: 'không có data'
                }
            }
            resolve(dataRental)
        } catch (e) {
            reject(e);
        }
    })
}


//thống kê doanh thu
rental.calculateOverallRevenue = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {};
            let sqlRental = `SELECT chutiem_id,users.ten, SUM(tongtien) AS tongdoanhthu, YEAR(ngaynhan) AS nam, 
            MONTH(ngaynhan) AS thang
            FROM phieuthue INNER JOIN users ON users.id = phieuthue.chutiem_id 
            WHERE (trangthai =2 OR trangthai=3 OR trangthai =4)`
            if (name !== null && name !== "") {
                sqlRental += ` AND chutiem_id = ${name}`;
            }
            sqlRental += ` GROUP BY chutiem_id, nam, thang`;
            const [rows, fields] = await pool.execute(sqlRental)
            let dataRow = rows
            if (dataRow.length > 0) {
                dataRental = {
                    data: dataRow,
                    errcode: 0,
                    message: 'ok'
                }
            } else {
                dataRental = {
                    errcode: 1,
                    message: 'không có data'
                }
            }
            resolve(dataRental)
        } catch (e) {
            reject(e);
        }
    })
}

//ds phiếu thuê bên admin
rental.getAll = (page, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {};
            let limit = '5';
            let sqlRental = 'select phieuthue.id,maphieu ,phieuthue.thongbao,phieuthue.diachi AS diachinguoithue,chutiem_sach.diachi AS diachinguoidang, GROUP_CONCAT(sach.id) AS sach_id, GROUP_CONCAT(sach.ten) AS tensach ,GROUP_CONCAT(masach) AS masach ,nguoithue_phieuthue.ten AS nguoithue,ngaythue, ngaynhan, ngaytra, GROUP_CONCAT(sach.tiencoc) AS tiencoc, chutiem_sach.ten as nguoidang, tongtien,phieuthue.trangthai,phieuthue.sdt AS sdtnguoithue, chutiem_sach.sdt AS sdtnguoidang from phieuthue'
            sqlRental += ' INNER JOIN phieuthue_sach on phieuthue.id = phieuthue_sach.phieuthue_id'
            sqlRental += ' INNER JOIN sach on phieuthue_sach.sach_id = sach.id '
            sqlRental += ' INNER JOIN users AS nguoithue_phieuthue on phieuthue.users_id = nguoithue_phieuthue.id '
            sqlRental += ' INNER JOIN users AS chutiem_sach on sach.id_users = chutiem_sach.id '
            let sqlTotal = "SELECT COUNT(*) as total FROM phieuthue"
            if (name) {
                sqlTotal += " WHERE maphieu LIKE '%" + name + "%' "
                sqlRental += " WHERE maphieu LIKE '%" + name + "%' "
            }
            sqlRental += 'GROUP BY phieuthue_id'
            const [counts] = await pool.execute(sqlTotal)
            let totalRow = counts[0].total
            let totalPage = Math.ceil(totalRow / limit)
            page = page > 0 ? Math.floor(page) : 1;
            page = page <= totalPage ? Math.floor(page) : totalPage;
            let start = (page - 1) * limit;
            start = start > 0 ? start : 0;
            const [rows, fields] = await pool.execute(sqlRental + ' ' + 'LIMIT ' + start + ',' + limit)
            let dataRow = rows
            if (dataRow.length > 0) {
                dataRental = {
                    totalPage,
                    name,
                    data: dataRow,
                    errcode: 0,
                    message: 'ok'
                }
            } else {
                dataRental = {
                    totalPage,
                    name,
                    errcode: 1,
                    message: 'không có data'
                }
            }
            resolve(dataRental)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = rental;