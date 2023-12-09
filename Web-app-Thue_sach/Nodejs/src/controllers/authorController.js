import author from '../models/author.model'
const fs = require('fs')


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
            msgAuthor: req.flash('msgAuthor'),
            errAuthor: req.flash('errAuthor'),
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
            msgAuthor: req.flash('msgAuthor'),
            errAuthor: req.flash('errAuthor'),
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
    try {
        let authorData = req.body
        if (req.file && req.file !== undefined) {
            authorData.hinhtacgia = req.file.filename;
        } else {
            authorData.hinhtacgia = "";
        }
        let data = await author.create(authorData);
        if (data.errcode == 0) {
            req.flash('msgPostAuthor', data.message)
            return res.redirect('/add-author')
        } else {
            if (req.file) {
                fs.unlink('src/public/img/' + authorData.hinhtacgia)
            }
            req.flash('errPostAuthor', data.message)
            return res.redirect('/add-author')
        }
    } catch {
        req.flash('errPostAuthor', "lỗi hệ thống")
        return res.redirect('/add-author')
    }

}

const deleteAuthor = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await author.delete(id);
        console.log(data)
        if (data.errcode == 0) {
            req.flash('msgAuthor', data.message)
            return res.redirect('/author')
        } else {
            req.flash('errAuthor', data.message)
            return res.redirect('/author')
        }
    } catch (e) {
        req.flash('errAuthor', "lỗi hệ thống")
        return res.redirect('/author')
    }

}

const getIdAuthor = async (req, res) => {
    try {
        let id = req.query.id;
        let data = await author.getId(id)
        if (data.errcode == 0) {
            return res.render('author/editAuthor.ejs', {
                data: data.dataAuthor,
                msgAuthor: req.flash('msgAuthor'),
                errAuthor: req.flash('errAuthor'),
            });
        } else {
            req.flash('errAuthor', data.message)
            return res.redirect('/author')
        }
    } catch (e) {
        req.flash('errAuthor', 'lỗi Server')
        return res.redirect('/author')
    }
}

const updateAuthor = async (req, res, next) => {
    try {
        let authorData = req.body
        let hinhmoi = {}
        if (req.file || req.file !== undefined) {
            hinhmoi = req.file.filename
        } else {
            hinhmoi = authorData.hinhtacgia
        }
        let data = await author.update(authorData, hinhmoi)
        if (data.errcode == 0) {
            if (req.file && authorData.hinhtacgia) {
                try {
                    fs.unlink('src/public/img/' + authorData.hinhtacgia, function (err) {
                    });
                } catch (error) {
                    throw error
                }
            }
            req.flash('msgAuthor', data.message)
            return res.redirect(`/get-authorFoByID?id=${authorData.id}`)
        } else {
            if (req.file) {
                fs.unlink('src/public/img/' + hinhmoi)
            }
            req.flash('errAuthor', data.message)
            return res.redirect(`/get-authorFoByID?id=${authorData.id}`)
        }
    } catch (error) {
        console.error(error)
        req.flash('errAuthor', 'lỗi Server')
        return res.redirect(`/get-authorFoByID?id=${authorData.id}`)
    }

}

const apiRandomAuthor = async (req, res) => {
    try {
        let data = await author.getRandom()
        if (data.errcode == 0) {
            return res.status(200).json({
                data: data.rows,
                status: 200,
                message: data.message,
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: data.message,
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

const apiRandomBook = async (req, res) => {
    try {
        let id_tacgia = req.body.id_tacgia
        let data = await author.getRandomBook(id_tacgia)
        if (data.errcode == 0) {
            return res.status(200).json({
                data: data.rows,
                status: 200,
                message: data.message,
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: data.message,
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'lỗi Server'
        })
    }

}

const apiGetBookAuthur = async (req, res) => {
    try {
        let id_authur = req.body.id_tacgia
        let data = await author.BookAuthur(id_authur)
        if (data.errcode == 0) {
            return res.status(200).json({
                data: data.rows,
                status: 200,
                message: data.message,
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: data.message,
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'lỗi Server'
        })
    }
}
module.exports = {
    getAuthor,
    getAddAuthor,
    postAuthor,
    deleteAuthor,
    getIdAuthor,
    updateAuthor,
    apiRandomAuthor,
    apiRandomBook,
    apiGetBookAuthur
}