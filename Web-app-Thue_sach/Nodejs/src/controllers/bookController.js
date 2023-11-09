import bookService from '../services/bookService'
import axios from "../axios";


const getbook = async (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    let name = req.query.name;
    if (name) {
        let data = await axios.get('/get-api-listBook?page=' + page + '&name=' + name)
        return res.render('book/listBook.ejs', {
            data: data.data,
            totalPage: data.totalPage,
            name: data.name,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page),
        })
    } else {
        let data = await axios.get('/get-api-listBook?page=' + page)
        return res.render('book/listBook.ejs', {
            data: data.data,
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
    let data = await axios.get('/get-api-detailBook?id=' + id)
    return res.render('book/detailBook.ejs', { data: data.data });
}

// duyệt sách
const BrowseBooks = async (req, res) => {
    let id = req.body.id;
    console.log(id)
    let data = await axios.put('/put-api-browseBook', { id })
    return res.redirect('/book')
}

// api lay ds sach ben admin
const getApiListBook = async (req, res) => {
    let name = req.query.name;
    let page = req.query.page ? req.query.page : 1;
    let categoryData = await bookService.getAllBook(page, name);
    return res.status(200).json({
        data: categoryData.rows,
        name: categoryData.name,
        totalPage: categoryData.totalPage,
        errcode: categoryData.errcode,
        message: categoryData.message,
        data: categoryData.rows ? categoryData.rows : 'không có dữ liệu'

    })
}


//api them sach
const postBook = async (req, res) => {
    let book = req.body
    let bookData = await bookService.createBook(book)
    return res.status(200).json({
        errcode: bookData.errcode,
        message: bookData.message
    })

}

const postApiListBookUser = async (req, res) => {
    let page = req.body.page ? req.body.page : 1;
    let book = await bookService.ListBookUser(page)
    return res.status(200).json({
        data: book.rows,
        name: book.name,
        totalPage: book.totalPage,
        errcode: book.errcode,
        message: book.message,
        data: book.rows ? book.rows : 'không có dữ liệu'
    })
}


//api hiện form chi tiết sách của user và admin
const getApiDetailBooks = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(500).json({
            errcode: 1,
            message: 'id không tồn tại'
        })
    }
    let data = await bookService.detailBook(id)
    return res.status(200).json({
        data: data.book ? data.book : 'ko',
        errcode: data.errcode,
        message: data.message,

    })
}

//api duyet sach
const apiBrowseBooks = async (req, res) => {
    let data = req.body.id;
    console.log(data)

    let databook = await bookService.BrowseBooksService(data);
    return res.status(200).json({
        message: databook.message,
        errcode: databook.errcode
    })
}


module.exports = {
    getbook,
    getDetailBook,
    getApiListBook,
    postBook,
    apiBrowseBooks,
    getApiDetailBooks,
    BrowseBooks,
    postApiListBookUser
}

