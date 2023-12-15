import category from "../models/category.model"

const getCategory = async (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    let name = req.query.name;
    if (name) {
        let data = await category.getPhanTrang(page, name);
        return res.render('category/listCategory.ejs', {
            data: data.rows,
            totalPage: data.totalPage,
            name: data.name,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page),
            msgCatetory: req.flash('msgCatetory'),
            errCatetory: req.flash('errCatetory'),
            errFoByID: req.flash('errFoByID')
        })
    } else {
        let data = await category.getPhanTrang(page);
        return res.render('category/listCategory.ejs', {
            data: data.rows,
            name: data.name,
            totalPage: data.totalPage,
            message: data.message,
            errcode: data.errcode,
            msgCatetory: req.flash('msgCatetory'),
            errCatetory: req.flash('errCatetory'),
            errFoByID: req.flash('errFoByID'),
            page: parseInt(page)
        })
    }
}

//chuyển sang trang chi tiết thể loại
const getFromCatetoryByID = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        req.flash('errFoByID', 'không có id')
        return res.redirect('/category')
    }
    let data = await category.getId(id)
    if (data.errcode == 0) {
        return res.render('category/editCategory.ejs', {
            data: data.dataCatetory,
            msgCatetory: req.flash('msgCatetory'),
            errCatetory: req.flash('errCatetory'),
        });
    } else {
        return res.redirect('/category')
    }
}

// thêm thể loại
const postCatetory = async (req, res) => {
    try {
        let categoryData = req.body
        if (!categoryData.ten) {
            let message = "vui lòng nhập thể loại cần thêm"
            req.flash('errPostCatetory', message)
            return res.redirect('/add-category')
        }
        if (categoryData.ten.length > 20) {
            let message = "không nhập quá 20 kí tự"
            req.flash('errPostCatetory', message)
            return res.redirect('/add-category')
        }
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharRegex.test(categoryData.ten)) {
            let message = "Tên thể loại không được chứa kí tự đặc biệt.";
            req.flash('errPostCatetory', message);
            return res.redirect('/add-category');
        }
        let data = await category.create(categoryData);
        if (data.errcode == 0) {
            req.flash('msgPostCatetory', data.message)
            return res.redirect('/add-category')
        } else {
            req.flash('errPostCatetory', data.message)
            return res.redirect('/add-category')
        }
    } catch (error) {
        let message = "lỗi hệ thống"
        req.flash('errPostCatetory', message)
        return res.redirect('/add-category')
    }
}

// chuyển sang trang thêm thể loại
const getAddCategory = async (req, res) => {
    return res.render('category/postCategory.ejs', {
        msgPostCatetory: req.flash('msgPostCatetory'),
        errPostCatetory: req.flash('errPostCatetory'),
    });
}



// xóa thể loại
const deleteCategory = async (req, res) => {
    let id = req.params.id;
    let data = await category.delete(id);
    if (data.errcode == 0) {
        req.flash('msgCatetory', data.message)
        return res.redirect('/category')
    } else {
        req.flash('errCatetory', data.message)
        return res.redirect('/category')
    }
}


//cập nhật thể loại
const putCatetory = async (req, res) => {
    let categoryData = req.body
    let data = await category.update(categoryData);
    if (data.errcode == 0) {
        req.flash('msgCatetory', data.message)
        return res.redirect(`/get-catetoryFoByID?id=${categoryData.id}`)
    } else {
        req.flash('errCatetory', data.message)
        return res.redirect(`/get-catetoryFoByID?id=${categoryData.id}`)
    }
}


//Api
const apiListCategory = async (req, res) => {
    let data = await category.getAll()
    if (data.errcode == 0) {
        return res.status(200).json({
            status: 200,
            data: data.rows,
            message: data.message
        })
    } else {
        return res.status(404).json({
            status: 404,
            message: data.message
        })
    }
}


module.exports = {
    getCategory,
    getAddCategory,
    postCatetory,
    deleteCategory,
    getFromCatetoryByID,
    putCatetory,
    apiListCategory
}