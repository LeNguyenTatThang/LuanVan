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
            let sqlRental = 'insert into phieuthue(users_id, chutiem_id, tongtien, diachi, ngaythue, trangthai, maphieu) values (?,?,?,?,?,?,?)'
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
                const [result] = await pool.execute(sqlRental, [data.users_id, data.chutiem_id, data.tongtien, data.diachi, data.ngaythue, trangthai, maphieu])
                let phieuthue_id = result.insertId;
                for (let bookId of bookIds) {
                    await pool.execute(sqlRental_Book, [bookId, phieuthue_id]);
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
            let sqlCheck = "SELECT sach.ten FROM sach INNER JOIN phieuthue_sach ON sach.id = phieuthue_sach.sach_id"
            sqlCheck += " INNER JOIN phieuthue ON phieuthue_sach.phieuthue_id = phieuthue.id"
            sqlCheck += " WHERE sach.id = ? AND (phieuthue.trangthai=0 OR phieuthue.trangthai=1 OR phieuthue.trangthai=2 OR phieuthue.trangthai=3)"
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
rental.upStatus2 = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {}
            let trangthai = 2;
            let ngaynhan = new Date();
            let ngaythueInt = parseInt(data.ngaythue, 10);
            let ngaytra = new Date(ngaynhan.getTime() + ngaythueInt * 24 * 60 * 60 * 1000);

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

const sendConfirmationEmail = async (email, confirmationCode) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '2023luanvan@gmail.com',
            pass: 'jsnn awej cdqo grmq'
        }
    });
    // Soạn email
    const mailOptions = {
        from: '2023luanvan@gmail.com',
        to: email,
        subject: 'Xác nhận đăng ký',
        text: `Mã xác nhận của bạn là: ${confirmationCode}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


//trả hàng 
rental.upStatus3 = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {};
            let trangthai = 3;
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

//trờ trả
rental.upStatus4 = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {};
            let trangthai = 5;
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

//danh sach đơn hàng thuê
rental.getRent = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {};
            let sqlRental = 'select phieuthue.id, GROUP_CONCAT(sach.ten) AS tensach ,nguoithue_phieuthue.ten AS nguoithue,ngaythue, ngaynhan, ngaytra, GROUP_CONCAT(sach.tiencoc) AS tiencoc, chutiem_sach.ten as nguoidang, tongtien from phieuthue'
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



//danh sach đơn hàng cho thuê
rental.getRentOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {};
            let sqlRental = 'select phieuthue.id, GROUP_CONCAT(sach.ten) AS tensach, GROUP_CONCAT(sach.tiencoc) AS tiencoc , nguoithue_phieuthue.ten AS nguoithue,ngaythue, ngaynhan, ngaytra, tongtien FROM phieuthue'
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

module.exports = rental;