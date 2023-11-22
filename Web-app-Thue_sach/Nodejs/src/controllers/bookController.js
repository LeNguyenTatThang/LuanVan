import axios from "../axios";
import book from '../models/book.model'
import fs from 'fs/promises'


const getbook = async (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    let name = req.query.name;
    if (name) {
        let data = await axios('/get-api-bookAdmin?name=' + name + '&page=' + page)
        return res.render('book/listBook.ejs', {
            data: data.data,
            totalPage: data.totalPage,
            name: data.name,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page),
        })
    } else {
        let data = await axios('/get-api-bookAdmin?page=' + page)
        return res.render('book/listBook.ejs', {
            data: data.data,
            name: data.name,
            totalPage: data.totalPage,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page)
        }, function (err, html) {
            res.send(html)
        })
    }
}

const apilistBook = async (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    let name = req.query.name;
    if (name) {
        let data = await book.getTrangthai0(page, name);
        return res.status(200).json({
            data: data.rows,
            totalPage: data.totalPage,
            name: data.name,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page),
        })
    } else {
        let data = await book.getTrangthai0(page);
        return res.status(200).json({
            data: data.rows,
            totalPage: data.totalPage,
            name: data.name,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page),
        })
    }
}

const getbrowebook = async (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    let name = req.query.name;
    if (name) {
        let data = await book.getsachduyet(page, name);
        return res.render('book/listbrowebook.ejs', {
            data: data.rows,
            totalPage: data.totalPage,
            name: data.name,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page),
        })
    } else {
        let data = await book.getsachduyet(page);
        return res.render('book/listbrowebook.ejs', {
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
    return res.render('book/detailBook.ejs', {
        data: data.book, msgBook: req.flash('msgBook'),
        errBook: req.flash('errBook'),
    });
}

const BrowseBooks = async (req, res) => {
    let id = req.body.id;
    console.log(id)
    await book.updateTrangthai(id);
    return res.redirect('/book')
}

//từ chối duyệt và thông báo
const BoosMessage = async (req, res) => {
    try {
        let data = req.body;
        console.log
        req.flash('msgBook', dataMsr.message)
        return res.redirect(`/get-detailbook?id=${data.id}`)
    } catch (error) {
        req.flash('errBook', "lỗi hệ thống")
    }
}

//API

//api them sach
const postBook = async (req, res, next) => {
    let bookData = req.body
    if (req.file && req.file !== undefined) {
        bookData.hinh = req.file.filename
        console.log(bookData.hinh)
    }
    if (!req.file || req.file === undefined) {
        return res.status(401).json({
            status: 401,
            message: 'không có hình'
        })
    }
    let data = await book.create(bookData)
    if (data.errcode === 0) {
        req.io.emit('updateData');
        console.log('Event updateData emitted');
        return res.status(200).json({
            status: 200,
            message: data.message
        })
    } else {
        // fs.unlink('src/public/img/' + bookData.hinh)
        return res.status(400).json({
            status: 400,
            message: data.message
        })
    }
}

//api ds sach
const postApiListBookUser = async (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    let bookData = await book.getTrangthai1(page)
    return res.status(200).json({
        data: bookData.rows,
        name: bookData.name,
        totalPage: bookData.totalPage,
        errcode: bookData.errcode,
        message: bookData.message,
        data: bookData.rows ? bookData.rows : 'không có dữ liệu'
    })
}


//api lấy id của sách
const getApiDetailBooks = async (req, res) => {
    try {
        let id = req.query.id
        let data = await book.getId(id)
        if (data.errcode == 0) {
            return res.status(200).json({
                data: data.book ? data.book : 'ko',
                status: 200,
                message: data.message,
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: 'id không tồn tại'
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'lỗi hệ thống'
        })
    }
}




module.exports = {
    getbook,
    getDetailBook,
    postBook,
    getApiDetailBooks,
    BrowseBooks,
    postApiListBookUser,
    getbrowebook,
    apilistBook,
    BoosMessage
}

