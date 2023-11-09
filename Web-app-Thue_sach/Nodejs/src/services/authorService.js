import pool from "../config/connectDB";

let getAllAuthor = (page, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let limit = '5';
            let sql = "SELECT * FROM tacgia";
            let sqlTotal = "SELECT COUNT(*) as total FROM tacgia"
            if (name) {
                sqlTotal += " WHERE tentacgia LIKE '%" + name + "%' "
            }

            const [counts] = await pool.execute(sqlTotal)
            let totalRow = counts[0].total
            let totalPage = Math.ceil(totalRow / limit)
            page = page > 0 ? Math.floor(page) : 1;
            page = page <= totalPage ? Math.floor(page) : totalPage;
            let start = (page - 1) * limit;
            start = start > 0 ? start : 0;
            if (name) {
                sql += " WHERE tentacgia LIKE '%" + name + "%' "
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
            reject(data)
        }
    })
}

//thêm tác giả
let createAuthor = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let authorData = {};
            console.log(data.tentacgia)
            let author = await checkAuthor(data.tentacgia)
            if (author === true) {
                await pool.execute('insert into tacgia(hinhtacgia, tentacgia, mota, gioithieu) values (?, ?, ?, ?)',
                    [data.hinhtacgia, data.tentacgia, data.mota, data.gioithieu]);
                authorData.errcode = 0;
                authorData.message = 'Thêm tác giả thành công'

            } else {
                authorData.errcode = 1;
                authorData.message = 'tác giả này đã tồn tại';
            }
            resolve(authorData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkAuthor = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data1 = data.trim();
            let data2 = data1.replace(/\s+/g, ' ');
            const [rows, fields] = await pool.execute('SELECT * FROM tacgia where tentacgia= ?', [data2])
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

let AuthorBook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataAuthor = {}
            let sql = "select * from tacgia"
            let sql1 = "select * from sach where id_tacgia=?"
            const [rows] = await pool.execute(sql,)
            // const [result] = await pool.execute(sql1)
            let data = rows
            data.forEach(async function (author) {
                author.id
                const [result] = await pool.execute(sql1, [author.id])
                dataAuthor = result
                resolve(dataAuthor)
            })
            // console.log("id: " + author.id)
            // dataAuthor = author
            // console.log("dđ", dataAuthor)
            // resolve(dataAuthor)
        } catch (error) {

        }
    })
}

module.exports = {
    AuthorBook,
    getAllAuthor,
    createAuthor
}