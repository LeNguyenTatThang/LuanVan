
import axios from "../axios";
import categoryService from "../services/categoryService"

const getCategory = async (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    let name = req.query.name;
    if (name) {
        let data = await axios.get('/get-api-listCatetory?page=' + page + '&name=' + name)
        return res.render('category/listCategory.ejs', {
            data: data.data,
            totalPage: data.totalPage,
            name: data.name,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page),
            errFoByID: req.flash('errFoByID')
        })
    } else {
        let data = await axios.get('/get-api-listCatetory?page=' + page)
        return res.render('category/listCategory.ejs', {
            data: data.data,
            name: data.name,
            totalPage: data.totalPage,
            message: data.message,
            errcode: data.errcode,
            errFoByID: req.flash('errFoByID'),
            page: parseInt(page)
        })
    }
}

// chi tiết thể loại
const getFromCatetoryByID = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        req.flash('errFoByID', 'không có id')
        return res.redirect('/category')
    }
    let data = await axios.get('get-api-CatetoryByID?id=' + id)
    if (data.errcode == 0) {
        return res.render('category/editCategory.ejs', { data: data.data });
    } else {
        req.flash('errFoByID', data.message)
        return res.render('/category')
    }
}

// thêm thể loại
const postCatetory = async (req, res) => {
    let category = req.body
    if (!category.ten) {
        let message = "vui lòng nhập thể loại cần thêm"
        req.flash('message', message)
        return res.redirect('/add-category')
    } else {
        let data = await axios.post('/post-api-catetory', category)
        if (data.errcode == 0) {
            req.flash('message', data.message)
            return res.redirect('/add-category')
        } else {
            req.flash('message', data.message)
            return res.redirect('/add-category')
        }
    }
}

// chuyển sang trang thêm thể loại
const getAddCategory = async (req, res) => {
    return res.render('category/postCategory.ejs', { message: req.flash('message') });
}



// xóa thể loại
const deleteCategory = async (req, res) => {
    let id = req.params.id;
    let data = await axios.delete('/delete-api-catetory/' + id)
    if (data.errcode == 0) {
        res.locals.message = data.message
        return res.redirect('/category')
    } else {
        res.locals.message = data.message
        console.log(res.locals.message)
        return res.redirect('/category')
    }
}


//cập nhật thể loại
const putCatetory = async (req, res) => {
    let category = req.body

    let data = await axios.put('/put-api-category', category)
    if (data.errcode == 0) {
        req.flash('errFoByID', data.message)
        return res.redirect('/category')
    } else {
        req.flash('errFoByID', data.message)
        return res.redirect('/category')
    }
}


//Api

// Api lấy ds tìm kiếm phân trang
const getApiListCategory = async (req, res) => {
    let name = req.query.name;
    let page = req.query.page ? req.query.page : 1;
    let categoryData = await categoryService.getAllCategory(page, name);
    return res.status(200).json({
        data: categoryData.rows,
        name: categoryData.name,
        totalPage: categoryData.totalPage,
        errcode: categoryData.errcode,
        message: categoryData.message,
        data: categoryData.rows ? categoryData.rows : 'không có dữ liệu'

    })
}

// api thêm thể loại
const postApiCategory = async (req, res) => {
    let category = req.body;
    if (!category.ten) {
        return res.status(500).json({
            message: 'vui lòng nhập thông tin'
        })
    }
    let categoryData = await categoryService.createCategory(category);
    return res.status(200).json({
        errcode: categoryData.errcode,
        message: categoryData.message,
    })
}

// api xóa thể loại
const deleteApiCategory = async (req, res) => {
    let id = req.params.id;

    let data = await categoryService.deleteCatetoryByID(id);
    return res.status(200).json({
        errcode: data.errcode,
        message: data.message
    })


}

// api chi tiet the loai
const getApiFromCatetoryByID = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(500).json({
            message: 'id không tồn tại'
        })
    }
    let data = await categoryService.getCategoryInFoByID(id)
    console.log(data)
    return res.status(200).json({
        data: data.dataCatetory ? data.dataCatetory : 'a',
        errcode: data.errcode,
        message: data.message
    })
}

// api cập nhật thể loại
let putApiCategory = async (req, res) => {
    let data = req.body;
    console.log(data.ten)
    if (!data.ten) {
        return res.status(500).json({
            message: 'dữ liệu không tồn tại',
            errcode: 1
        })
    }
    let category = await categoryService.updateCatetory(data);
    return res.status(200).json({
        message: category.message,
        errcode: category.errcode
    })


}

module.exports = {
    getCategory,
    getAddCategory,
    postCatetory,
    getApiFromCatetoryByID,
    deleteCategory,
    getApiListCategory,
    postApiCategory,
    deleteApiCategory,
    getFromCatetoryByID,
    putApiCategory,
    putCatetory
}