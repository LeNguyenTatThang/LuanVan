import axios from "../axios";
import authorService from "../services/authorService"
import author from '../models/author.model'
const fs = require('fs/promises')


const getAuthor = async (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    let name = req.query.name;
    if (name) {
        let data = await author.getAll(page, name);
        return res.render('author/listAuthor.ejs', {
            data: data.rows,
            totalPage: data.totalPage,
            name: data.name,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page),

        })
    } else {
        let data = await author.getAll(page, name);
        return res.render('author/listAuthor.ejs', {
            data: data.rows,
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
    if (req.file && req.file !== undefined) {
        author.hinhtacgia = req.file.filename
    }
    console.log(author.hinhtacgia, author.tentacgia)
    if (!author.tentacgia) {
        let message = "vui lòng nhập tên tác giả cần thêm"
        if (req.file && req.file !== undefined) {
            fs.unlink('src/public/img/' + author.hinhtacgia)
        }
        req.flash('errPostAuthor', message)
        return res.redirect('/add-author')
    } else {
        let data = await authorService.createAuthor(author);
        if (data.errcode == 0) {
            req.flash('msgPostAuthor', data.message)
            return res.redirect('/add-author')

        } else {
            fs.unlink('src/public/img/' + author.hinhtacgia)
            req.flash('errPostAuthor', error.data.message)
            return res.redirect('/add-author')
        }
    }
}

const deleteAuthor = async (req, res) => {
    // let id = req.query.id
    // await authorService.delete()
}








module.exports = {
    getAuthor,
    getAddAuthor,
    postAuthor
}