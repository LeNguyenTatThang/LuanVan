import { error } from "console";
import chapter from "../models/chapter.model"
const fs = require('fs');

const listBookchapter = async (req, res) => {
    try {
        let data = req.body
        let dataChap = await chapter.getChaptersByBookId(data)
        console.log('code', dataChap)
        if (dataChap.errcode == 0) {
            return res.status(200).json({
                status: 200,
                data: dataChap.chapters,
                totalPage: dataChap.totalPage
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: dataChap.message
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: 'lỗi Server'
        })
    }
}

const listAllBookchapter = async (req, res) => {
    try {
        let data = req.body
        let dataChap = await chapter.getAllChaptersByBookId(data)
        console.log('code', dataChap)
        if (dataChap.errcode == 0) {
            return res.status(200).json({
                status: 200,
                data: dataChap.chapters,
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: dataChap.message
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: 'lỗi Server'
        })
    }
}

const postChapter = async (req, res) => {
    try {
        let data = req.body
        let filePath
        if (req.file) {
            filePath = req.file.path;
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const words = fileContent.split(/\s+/)
            const maxWords = 8000;
            if (words.length > maxWords) {
                return res.status(400).json({
                    status: 400,
                    message: `Số từ vượt quá giới hạn (${maxWords}).`
                });
            } else {
                data.noidung = fileContent;
                let dataChapter = await chapter.createChap(data)
                if (dataChapter.errcode === 0) {
                    return res.status(200).json({
                        status: 200,
                        message: dataChapter.message
                    })
                } else if (dataChapter.errcode === 2) {
                    return res.status(404).json({
                        status: 404,
                        message: dataChapter.message
                    })
                } else if (dataChapter.errcode === 1) {
                    return res.status(401).json({
                        status: 401,
                        message: dataChapter.message
                    })
                }
            }
        } else {
            console.error(error)
            return res.status(400).json({
                status: 400,
                message: 'không có file hoặc sai dịnh dạng'
            });
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: 'lỗi Server'
        })
    }
}

//api hiện nội dung của chương truyện
const ContentChapter = async (req, res) => {
    try {
        let sach_id = req.query.sach_id
        let chuong = req.query.chuong
        let dataChapter = await chapter.getContentChapters(sach_id, chuong)
        if (dataChapter.errcode === 0) {
            return res.status(200).json({
                status: 200,
                data: dataChapter.data,
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: dataChapter.message
            });
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: 'lỗi Server'
        })
    }
}

const updateChapter = async (req, res) => {
    try {
        let data = req.body
        let dataChapter = await chapter.update(data)
        if (dataChapter.errcode === 0) {
            return res.status(200).json({
                status: 200,
                message: dataChapter.message
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: dataChapter.message
            });
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: 'lỗi Server'
        })
    }
}

module.exports = {
    postChapter,
    listBookchapter,
    ContentChapter,
    updateChapter,
    listAllBookchapter
}
