
import pool from "../config/connectDB";
const rental = function () {

}

// thêm thể loại
rental.create = function (data) {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRental = {}
            let sqlRental = 'insert into phieuthue(users_id, chutiem_id, sach_id, tongtien, trangthai, maphieu, ngaythue,ngaytao, ngaytao) values (?,?,?,?,?,?,?,?,?)'
            await pool.execute(sqlRental, [data.users_id, data.chutiem_id, data.sach_id, data.trangthai,])
            resolve(dataRental)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = rental;