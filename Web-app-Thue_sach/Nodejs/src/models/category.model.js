
import pool from "../config/connectDB";
const category = function () {

}

// thêm thể loại
category.create = function (data) {
    return new Promise(async (resolve, reject) => {
        try {
            let categoryData = {};
            console.log(data)
            let categories = await checkCategories(data.ten)
            if (categories === true) {
                const [rows] = await pool.execute('insert into theloai(ten) values (?)',
                    [data.ten]);
                categoryData.errcode = 0;
                categoryData.message = 'Thêm thể loại thành công'

            } else {
                categoryData.errcode = 1;
                categoryData.message = 'Thể loại này đã tồn tại';
            }
            resolve(categoryData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkCategories = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data1 = data.trim();
            let data2 = data1.replace(/\s+/g, ' ');
            const [rows, fields] = await pool.execute('SELECT * FROM theloai where ten= ?', [data2])
            let categories = rows[0];
            if (categories) {
                resolve(false);
            } else {
                resolve(true)
            }
        } catch (error) {
            reject(error);
        }
    })
}

category.getPhanTrang = async (page, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let limit = '5';
            let sql = "SELECT * FROM theloai";
            let sqlTotal = "SELECT COUNT(*) as total FROM theloai"
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
                    errcode: 1,
                    message: 'không có dữ liệu'
                }
            } else {
                data = {
                    rows,
                    totalPage,
                    name,
                    errcode: 0,
                    message: 'ok'
                }
            }
            resolve(data)
        } catch (e) {
            reject(e);
        }
    })

}




// chi tiết thể loại
category.getId = function (id) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            const [rows, fields] = await pool.execute('SELECT * FROM theloai where id= ?', [id])
            let dataCatetory = rows[0];
            if (dataCatetory) {
                data = {
                    errcode: 0,
                    dataCatetory,
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

//cap nhat the loai
category.update = function (data) {
    return new Promise(async (resolve, reject) => {
        try {
            let data1 = data.ten.trim();
            let data2 = data1.replace(/\s+/g, ' ');
            let dataCaterory = {}
            const [checkTen, fields] = await pool.execute('SELECT id FROM theloai where ten = ? and id != ?', [data2, data.id])
            let kt = checkTen[0]
            if (kt) {
                dataCaterory = {
                    errcode: 2,
                    message: 'tên thể loại này đã tồn tại'
                }
            } else {
                await pool.execute('update theloai set ten = ? where id = ?',
                    [data2, data.id]);
                dataCaterory = {
                    errcode: 0,
                    message: 'cập nhật thành công'
                }
            }
            resolve(dataCaterory)
        } catch (e) {
            reject(e);
        }
    })
}

category.delete = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            const [rows] = await pool.execute("SELECT theloai.id FROM theloai INNER JOIN sach ON theloai.id=sach.theloai_id WHERE theloai.id = ?", [id])
            if (rows[0]) {
                data = {
                    errcode: 1,
                    message: 'không thể xóa thể loại này'
                }
            } else {
                let sql = "DELETE from theloai WHERE id = ?"
                await pool.execute(sql, [id])
                data = {
                    errcode: 0,
                    message: 'xóa thành công'
                }
            }
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}

category.getAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            let sql = "select id,ten from theloai"
            const [rows] = await pool.execute(sql)
            if (rows.length > 0) {
                data = {
                    rows,
                    errcode: 0,
                    message: 'ok'
                }
            } else {
                data = {
                    rows,
                    errcode: 1,
                    message: 'không có dữ liệu'
                }
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = category;