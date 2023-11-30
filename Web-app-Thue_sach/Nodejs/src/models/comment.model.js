import pool from "../config/connectDB";

const comment = function () {
}
comment.getAll = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let commentData = {};
            let sql = 'select users.ten,users.hinh, binhluan.noidung, ngaytao from binhluan'
            sql += ' INNER JOIN sach on binhluan.sach_id = sach.id'
            sql += ' INNER JOIN users on binhluan.users_id = users.id where sach.id=?'
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

comment.create = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let commentData = {};
            let sqlCheck = 'select id from users where id = ? and trangthai = 1'
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

module.exports = comment;