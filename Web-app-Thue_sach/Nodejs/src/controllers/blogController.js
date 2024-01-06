import blog from '../models/blog.model'
const fs = require('fs')


const getBlog = async (req, res) => {
    try {
        let page = req.query.page ? req.query.page : 1;
        let name = req.query.name;
        let data
        if (name) {
            data = await blog.getAll(page, name);
        } else {
            data = await blog.getAll(page);
        }
        return res.render('blog/blog.ejs', {
            data: data.rows,
            name: data.name,
            totalPage: data.totalPage,
            message: data.message,
            errcode: data.errcode,
            msgBlog: req.flash('msgBlog'),
            errBlog: req.flash('errBlog'),
            page: parseInt(page)
        })
    } catch (error) {
        console.error(error)
        req.flash('errBlog', "lỗi Server")
        return res.redirect('/blog')
    }
}

const addBlogPage = async (req, res) => {
    return res.render('blog/create.ejs', {
        msgBlog: req.flash('msgBlog'),
        errBlog: req.flash('errBlog'),
    });

}

const createBlog = async (req, res) => {
    try {
        let blogData = req.body
        let data = await blog.create(blogData);
        if (data.errcode == 0) {
            req.flash('msgBlog', data.message)
            return res.redirect('/addBlogPage')
        } else {
            req.flash('errBlog', data.message)
            return res.redirect('/addBlogPage')
        }
    } catch (error) {
        console.error(error)
        req.flash('errBlog', "c")
        return res.redirect('/addBlogPage')
    }

}

const deleteBlog = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await blog.delete(id);
        if (data.errcode === 0) {
            req.flash('msgBlog', data.message)
            return res.redirect('/blog')
        } else {
            req.flash('errBlog', data.message)
            return res.redirect('/blog')
        }
    } catch (error) {
        console.error(error)
        req.flash('errBlog', "lỗi Server")
        return res.redirect('/blog')
    }

}

const detaiBlog = async (req, res) => {
    try {
        let id = req.query.id;
        let data = await blog.getId(id)
        if (data.errcode == 0) {
            return res.render('blog/detail.ejs', {
                data: data.data,
                msgBlog: req.flash('msgBlog'),
                errBlog: req.flash('errBlog'),
            });
        } else {
            req.flash('errBlog', data.message)
            return res.redirect('/blog')
        }
    } catch (e) {
        console.error(error)
        req.flash('errBlog', "lỗi Server")
        return res.redirect('/blog')
    }
}

const updateBlog = async (req, res, next) => {
    try {
        let blogData = req.body
        let data = await blog.update(blogData)
        if (data.errcode == 0) {
            req.flash('msgBlog', data.message)
            return res.redirect(`/detaiBlog?id=${blogData.id}`)
        } else {
            if (req.file) {
                fs.unlink('src/public/img/' + hinhmoi)
            }
            req.flash('errBlog', data.message)
            return res.redirect(`/detaiBlog?id=${blogData.id}`)
        }
    } catch (error) {
        console.error(error)
        req.flash('errBlog', data.message)
        return res.redirect(`/detaiBlog?id=${blogData.id}`)
    }

}

const apiGetBlog = async (req, res) => {
    try {
        let page = req.query.page ? req.query.page : 1;
        let name = req.query.name;
        let data
        if (name) {
            data = await blog.getAll(page, name);
        } else {
            data = await blog.getAll(page);
        }
        if (data.errcode === 0) {
            return res.status(200).json({
                status: 200,
                data: data.rows,
                totalPage: data.totalPage,
                page: parseInt(page)
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: data.message,
                totalPage: data.totalPage,
                page: parseInt(page)
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: "lỗi Server"
        })
    }
}

const apiGetBlogById = async (req, res) => {
    try {
        let id = req.query.id;
        let data = await blog.getId(id)
        if (data.errcode == 0) {
            return res.status(200).json({
                status: 200,
                data: data.data,
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: data.message,
            })
        }
    } catch (e) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: "lỗi Server"
        })
    }
}



module.exports = {
    getBlog,
    addBlogPage,
    createBlog,
    deleteBlog,
    detaiBlog,
    updateBlog,
    apiGetBlog,
    apiGetBlogById,
}