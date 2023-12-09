import pool from "../config/connectDB";
const dashboard = function () { }

dashboard.logAccess = (diachi_ip, trangtruycap) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dashboardModel = {}
            let sql = 'INSERT INTO truycap (diachi_ip, trangtruycap) VALUES (?,?)'
            const [result, fieds] = await pool.execute(sql, [diachi_ip, trangtruycap])
            if (result) {
                dashboardModel = {
                    errcode: 0,
                    message: 'thành công'
                }
            } else {
                dashboardModel = {
                    errcode: 0,
                    message: 'thất bại'
                }
            }
            resolve(dashboardModel)
        } catch (error) {
            reject(error)
        }
    })
};

module.exports = dashboard