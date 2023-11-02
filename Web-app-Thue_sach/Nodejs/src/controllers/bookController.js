import bookService from '../services/bookService'

let getbook = async (req, res) => {
    return res.render('book/listBook.ejs');
}

let getApiListBook = async (req, res) => {
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



module.exports = {
    getbook,
    getDetailBook,
    getApiListBook
}

