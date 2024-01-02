import { DATE } from "sequelize";
import pool from "../config/connectDB";

const chapter = function () { }

//thêm chương cho sách đọc
chapter.createChap = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataChapter = {}
            let sqlCount = "SELECT COUNT(chuong) as sochuong FROM noidungsach INNER JOIN sach ON noidungsach.sach_id= sach.id WHERE sach.id=?"
            let sqlCheck = "select * from sach where id =? and loai = 1 "
            let sqlChapter = "insert into noidungsach(chuong,tieude, noidung, sach_id) values (?, ?, ?,?)"
            const [checkCount] = await pool.execute(sqlCount, [data.sach_id])
            let chuong = checkCount[0].sochuong + 1;
            console.log(chuong)
            const [check] = await pool.execute(sqlCheck, [data.sach_id])
            const dataCheck = check[0]
            console.log(dataCheck)
            if (dataCheck) {
                const [result, fields] = await pool.execute(sqlChapter, [chuong, data.tieude, data.noidung, data.sach_id])
                if (fields) {
                    dataChapter = {
                        errcode: 1,
                        message: "Thất bại"
                    }
                } else {
                    dataChapter = {
                        errcode: 0,
                        message: "Thành công"
                    }
                }
            } else {
                dataChapter = {
                    errcode: 2,
                    message: "không tìm thấy"
                }
            }
            resolve(dataChapter)
        } catch (error) {
            reject(error)
        }
    })
}

chapter.getChaptersByBookId = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let page = data.page ? data.page : 1
            let chap = {}
            let limit = '20';
            const sql = "SELECT id, chuong,tieude FROM noidungsach WHERE sach_id = ? LIMIT ?, ?";
            let sqlTotal = "SELECT COUNT(*) as total FROM noidungsach WHERE sach_id = ?"
            const [counts] = await pool.execute(sqlTotal, [data.sach_id])
            let totalRow = counts[0].total
            let totalPage = Math.ceil(totalRow / limit)
            page = page > 0 ? Math.floor(page) : 1
            page = page <= 0 ? Math.floor(page) : 1
            page = page <= totalPage ? Math.floor(page) : totalPage
            let start = (page - 1) * limit
            const [chapters, fields] = await pool.execute(sql, [data.sach_id, start, limit]);
            if (chapters.length > 0) {
                chap = {
                    totalPage,
                    errcode: 0,
                    chapters: chapters
                }
            } else {
                chap = {
                    errcode: 1,
                    message: "Không tìm thấy chương nào cho quyển sách này",
                }
            }
            resolve(chap)
        } catch (error) {
            reject(error);
        }
    });
};

chapter.getAllChaptersByBookId = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let chap = {}
            const sql = "SELECT id, chuong,tieude FROM noidungsach WHERE sach_id = ? ";
            const [chapters, fields] = await pool.execute(sql, [data.sach_id]);
            if (chapters.length > 0) {
                chap = {
                    errcode: 0,
                    chapters: chapters
                }
            } else {
                chap = {
                    errcode: 1,
                    message: "Không tìm thấy chương nào cho quyển sách này",
                }
            }
            resolve(chap)
        } catch (error) {
            reject(error);
        }
    });
};

chapter.getContentChapters = (sach_id, chuong) => {
    return new Promise(async (resolve, reject) => {
        try {
            let chap = {}
            let sql = "SELECT noidungsach.id, chuong,tieude, noidungsach.noidung FROM noidungsach";
            sql += " INNER JOIN sach ON noidungsach.sach_id = sach.id"
            sql += " WHERE sach_id= ? AND noidungsach.chuong= ? "
            const [chapters, fields] = await pool.execute(sql, [sach_id, chuong]);
            let dataChap = chapters[0];
            console.log(dataChap)
            if (dataChap) {
                chap = {
                    data: dataChap,
                    errcode: 0,
                    chapters: chapters
                }
            } else {
                chap = {
                    errcode: 1,
                    message: "Chương này chưa có",
                }
            }
            resolve(chap)
        } catch (error) {
            reject(error);
        }
    });
};

chapter.update = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let chap = {}
            let sql = "UPDATE noidungsach SET tieude =?, noidung=? WHERE id = ?";
            const [result, fields] = await pool.execute(sql, [data.tieude, data.noidung, data.id]);
            if (result) {
                chap = {
                    errcode: 0,
                    message: "cập nhập thành công"
                }
            } else {
                chap = {
                    errcode: 1,
                    message: "cập nhật thất bại",
                }
            }
            resolve(chap)
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = chapter;
