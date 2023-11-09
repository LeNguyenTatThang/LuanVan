import axios from "../axios";
import authorService from "../services/authorService"

const getAuthor = async (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    let name = req.query.name;
    if (name) {
        let data = await axios.get('/get-api-listAuthor?page=' + page + '&name=' + name)
        return res.render('author/listAuthor.ejs', {
            data: data.data,
            totalPage: data.totalPage,
            name: data.name,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page),

        })
    } else {
        let data = await axios.get('get-api-listAuthor?page=' + page)
        return res.render('author/listAuthor.ejs', {
            data: data.data,
            name: data.name,
            totalPage: data.totalPage,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page)
        })
    }
}

const getAddAuthor = async (req, res) => {
    return res.render('author/postAuthor.ejs', {
        msgPostAuthor: req.flash('msgPostAuthor'),
        errPostAuthor: req.flash('errPostAuthor'),
    });
}


const postAuthor = async (req, res) => {
    let author = req.body
    if (!author.tentacgia) {
        let message = "vui lòng nhập tên tác giả cần thêm"
        req.flash('errPostAuthor', message)
        return res.redirect('/add-author')
    } else {
        let data = await axios.post('/post-api-author', author)
        if (data.errcode == 0) {
            req.flash('msgPostAuthor', data.message)
            return res.redirect('/add-author')
        } else {
            req.flash('errPostAuthor', data.message)
            return res.redirect('/add-author')
        }
    }
}

// api thêm tac giả
const postApiAuthor = async (req, res) => {
    let author = req.body;
    if (!author.tentacgia) {
        return res.status(500).json({
            message: 'vui lòng nhập thông tin'
        })
    }
    let authorData = await authorService.createAuthor(author);
    return res.status(200).json({
        errcode: authorData.errcode,
        message: authorData.message,
    })
}

// api lấy ds tác giả của trang admin
const getApiListAuthor = async (req, res) => {
    let name = req.query.name;
    let page = req.query.page ? req.query.page : 1;
    console.log(page)
    let authorData = await authorService.getAllAuthor(page, name);
    return res.status(200).json({
        data: authorData.rows,
        name: authorData.name,
        totalPage: authorData.totalPage,
        errcode: authorData.errcode,
        message: authorData.message,
        data: authorData.rows ? authorData.rows : 'không có dữ liệu'

    })
}

// api tác giả và ds sách của tác giả
const getApiAuthorBook = async (req, res) => {
    let data = await authorService.AuthorBook()
    return res.status(200).json({
        data: data
    })
}

module.exports = {
    getApiAuthorBook,
    getApiListAuthor,
    getAuthor,
    getAddAuthor,
    postApiAuthor,
    postAuthor
}