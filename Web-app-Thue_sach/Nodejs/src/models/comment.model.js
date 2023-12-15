import pool from "../config/connectDB";

const comment = function () {
}
comment.getAll = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let commentData = {};
            let sql = 'select users.ten,users.hinh, binhluan.noidung, binhluan.ngaytao from binhluan'
            sql += ' INNER JOIN sach on binhluan.sach_id = sach.id'
            sql += ' INNER JOIN users on binhluan.users_id = users.id where sach.id=? AND binhluan.trangthai=1 ORDER BY binhluan.ngaytao DESC'
            const [rows] = await pool.execute(sql, [data]);
            if (rows.length > 0) {
                commentData = {
                    rows,
                    errcode: 0
                }
            } else {
                commentData = {
                    errcode: 1,
                    message: 'Không có bình luận'
                }
            }
            resolve(commentData)
        } catch (e) {
            reject(e);
        }
    })
}

comment.getComment = async (data, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let commentData = {};
            let sql = 'SELECT binhluan.id, users.ten, users.hinh, binhluan.noidung, binhluan.trangthai, binhluan.ngaytao FROM binhluan';
            sql += ' INNER JOIN sach ON binhluan.sach_id = sach.id';
            sql += ' INNER JOIN users ON binhluan.users_id = users.id WHERE sach.id = ?';

            if (name) {
                sql += " AND users.ten LIKE '%" + name + "%'";
            }

            sql += ' ORDER BY binhluan.ngaytao DESC';

            const [rows] = await pool.execute(sql, [data]);
            if (rows.length > 0) {
                commentData = {
                    name,
                    rows,
                    errcode: 0
                };
            } else {
                commentData = {
                    name,
                    errcode: 1,
                    message: 'Không có bình luận'
                };
            }
            resolve(commentData);
        } catch (e) {
            reject(e);
        }
    });
};


comment.create = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let commentData = {};
            let sqlCheck = 'select id from users where id = ? and cambl = 1'
            let sql = 'insert into binhluan(sach_id, users_id, noidung,trangthai, ngaytao) values (?, ?, ?, ?,?)'
            const [check] = await pool.execute(sqlCheck, [data.users_id]);
            if (check.length > 0) {
                commentData = {
                    errcode: 1,
                    message: 'bạn đã bị cấm chat'
                }
            } else {
                let trangthai = 1
                let ngaytao = new Date()
                const [result, fields] = await pool.execute(sql, [data.sach_id, data.users_id, data.noidung, trangthai, ngaytao]);
                if (result) {
                    commentData.errcode = 0;
                    commentData.message = 'thành công'
                }
            }
            resolve(commentData)
        } catch (e) {
            reject(e);
        }
    })
}

comment.updatestatus = (id, trangthai) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataBook = {};
            const [result, fields] = await pool.execute('update binhluan set trangthai = ? where id = ?',
                [trangthai, id]);
            if (result) {
                dataBook = {
                    errcode: 0,
                    message: 'Cập nhật trạng thái thành công'
                }
            } else {
                dataBook = {
                    errcode: 1,
                    message: 'cập nhập trạng thái thất bại'
                }
            }
            resolve(dataBook)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = comment;