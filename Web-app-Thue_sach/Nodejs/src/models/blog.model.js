import pool from "../config/connectDB";

const blog = {

}

blog.getAll = (page, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let limit = '5';
            let sql = "SELECT * FROM baiviet";
            let sqlTotal = "SELECT COUNT(*) as total FROM baiviet"
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
            reject(data)
        }
    })
}

blog.create = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blogData = {};
            let [result, fields] = await pool.execute('insert into baiviet(ten, noidung, trangthai) values (?, ?, ?)',
                [data.ten, data.noidung, data.trangthai]);
            if (result) {
                blogData = {
                    errcode: 0,
                    message: "thêm bài viết thành công"
                }
            } else {
                blogData = {
                    errcode: 1,
                    message: "thêm bài viết thành công"
                }
            }
            resolve(blogData)
        } catch (e) {
            reject(e);
        }
    })
}



blog.delete = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blogModel = {}
            let sql = "DELETE from baiviet WHERE id = ?"
            const [result, fields] = await pool.execute(sql, [id])
            if (result) {
                blogModel = {
                    errcode: 0,
                    message: 'xóa thành công'
                }
            } else {
                blogModel = {
                    errcode: 1,
                    message: 'xóa thất bại'
                }
            }
            resolve(blogModel)
        } catch (e) {
            reject(e)
        }
    })
}

blog.getId = function (id) {
    return new Promise(async (resolve, reject) => {
        try {
            let blogModel = {};
            const [rows, fields] = await pool.execute('SELECT * FROM baiviet where id= ?', [id])
            let data = rows[0];
            if (data) {
                blogModel = {
                    errcode: 0,
                    data
                }
            } else {
                blogModel = {
                    errcode: 1,
                    message: 'id không tồn tại',
                }
            }
            resolve(blogModel)
        } catch (e) {
            reject(e);
        }
    })
}




blog.update = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blogModel = {};
            let sql = "update baiviet set ten = ?,noidung = ?, trangthai = ? where id = ?"
            const [result, fields] = await pool.execute(sql, [data.ten, data.noidung, data.trangthai, data.id]);
            if (result) {
                blogModel = {
                    errcode: 0,
                    message: 'cập nhật thành công'
                }
            } else {
                blogModel = {
                    errcode: 1,
                    message: 'cập nhật thất bại'
                }
            }
            resolve(blogModel)
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = blog;