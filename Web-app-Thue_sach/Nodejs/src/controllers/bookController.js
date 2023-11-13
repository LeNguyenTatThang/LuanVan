
import book from '../models/book.model'
import fs from 'fs/promises'

const getbook = async (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    let name = req.query.name;
    if (name) {
        let data = await book.getTrangthai0(page, name);
        return res.render('book/listBook.ejs', {
            data: data.rows,
            totalPage: data.totalPage,
            name: data.name,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page),
        })
    } else {
        let data = await book.getTrangthai0(page);
        return res.render('book/listBook.ejs', {
            data: data.rows,
            name: data.name,
            totalPage: data.totalPage,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page)
        })
    }
}

const getDetailBook = async (req, res) => {
    let id = req.query.id;
    let data = await book.getId(id)
    return res.render('book/detailBook.ejs', { data: data.book });
}

const BrowseBooks = async (req, res) => {
    let id = req.body.id;
    console.log(id)
    await book.updateTrangthai(id);
    return res.redirect('/book')
}

//API

//api them sach
const postBook = async (req, res, next) => {
    let book = req.body
    if (req.file && req.file !== undefined) {
        book.hinh = req.file.filename
    }
    if (!req.file || req.file === undefined) {
        return res.status(401).json({
            status: 401,
            message: 'không có hình'
        })
    }
    let bookData = await book.create(book)
    if (bookData.errcode === 0) {
        return res.status(200).json({
            status: 200,
            message: bookData.message
        })
    } else {
        fs.unlink('src/public/img/' + book.hinh)
        return res.status(400).json({
            status: 400,
            message: bookData.message
        })
    }
}

//api ds sach
const postApiListBookUser = async (req, res) => {
    let page = req.body.page ? req.body.page : 1;
    let book = await book.getTrangthai1(page)
    return res.status(200).json({
        data: book.rows,
        name: book.name,
        totalPage: book.totalPage,
        errcode: book.errcode,
        message: book.message,
        data: book.rows ? book.rows : 'không có dữ liệu'
    })
}


//api lấy id của sách
const getApiDetailBooks = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(500).json({
            errcode: 1,
            message: 'id không tồn tại'
        })
    }
    let data = await book.getId(id)
    return res.status(200).json({
        data: data.book ? data.book : 'ko',
        errcode: data.errcode,
        message: data.message,

    })
}




module.exports = {
    getbook,
    getDetailBook,
    postBook,
    getApiDetailBooks,
    BrowseBooks,
    postApiListBookUser
}

