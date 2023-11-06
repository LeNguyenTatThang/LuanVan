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
let getDetailBook = (req, res) => {
    return res.render('book/detailBook.ejs');
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

module.exports = {
    getbook,
    getDetailBook,
    getApiListBook,
    postBook
}

