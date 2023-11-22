
import pool from "../config/connectDB";
const rental = function () {

}


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
            // let ngaytao = new Date();
            console.log(data)
            let maphieu = generateRandomCode(8)
            // let ngaytra = new Date(ngaytao.getTime() + data.ngaythue * 24 * 60 * 60 * 1000);
            let dataRental = {}
            let trangthai = 0;
            let sqlRental = 'insert into phieuthue(users_id, chutiem_id, tongtien, trangthai, maphieu) values (?,?,?,?,?)'
            let sqlRental_Book = 'insert into phieuthue_sach(sach_id, phieuthue_id) VALUES (?, ?)'
            const [result] = await pool.execute(sqlRental, [data.users_id, data.chutiem_id, data.tongtien, trangthai, maphieu])
            let bookIds = data.sach_id
            let phieuthue_id = result.insertId;
            console.log('id sach ', bookIds)
            console.log('id phiếu thuê ', phieuthue_id)
            for (let bookId of bookIds) {
                await pool.execute(sqlRental_Book, [bookId, phieuthue_id]);
            }
            dataRental = {
                message: 'thành công'
            }
            console.log(dataRental)
            resolve(dataRental)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = rental;