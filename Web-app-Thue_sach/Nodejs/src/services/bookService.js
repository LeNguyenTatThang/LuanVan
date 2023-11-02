import pool from "../config/connectDB";

let getAllBook = async (page, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let limit = '5';
            let sql = "SELECT sach.ten,sach.trangthai,sach.loai,sach.danhgia,gia,theloai.ten as theloai, users.ten as nguoidang FROM sach";
            sql += " INNER JOIN theloai ON theloai.id=sach.theloai_id INNER JOIN users ON sach.id_users=users.id WHERE sach.trangthai=0 "
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
            console.log(start)
            start = start > 0 ? start : 0;
            console.log('hh' + start)
            if (name) {
                sql += " AND sach.ten LIKE '%" + name + "%' "
            }
            const [rows, fields] = await pool.execute(sql + ' ' + 'order by sach.ten ASC LIMIT ' + start + ',' + limit)
            console.log(rows)
            console.log('kq :' + rows.length)
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

module.exports = {
    getAllBook
}