
import axios from "../axios";
import categoryService from "../services/categoryService"

let getCategory = async (req, res) => {
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
            page: parseInt(page)
        })
    } else {
        let data = await axios.get('/get-api-listCatetory?page=' + page)
        return res.render('category/listCategory.ejs', {
            data: data.data,
            name: data.name,
            totalPage: data.totalPage,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page)
        })
    }
}


let postCatetory = async (req, res) => {
    let category = req.body
    let data = await axios.post('/post-api-catetory', category)
    if (data.errcode == 0) {
        data.message
        return res.redirect('category')
    } else {
        data.message
        console.log(data.message);
    }

}



let getAddCategory = async (req, res) => {
    return res.render('category/postCategory.ejs');
}

let getEditCategory = async (req, res) => {
    return res.render('category/editCategory.ejs');
}

// let putCategory = async (req, res) => {
//     let data = req.body;
//     let allCategory = await categoryService.updateCatetory(data);
//     // return res.render('category/listCategory.ejs', { data: allCategory });
//     return res.redirect('/category');

// }

let deleteCategory = async (req, res) => {
    let id = req.params.id;
    console.log('ddđ' + id)
    let data = await axios.delete('/delete-api-catetory/' + id)
    return res.redirect('/category')
}



let getApiListCategory = async (req, res) => {
    let name = req.query.name;
    let page = req.query.page ? req.query.page : 1;
    console.log(page);
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

let postApiCategory = async (req, res) => {
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

let deleteApiCategory = async (req, res) => {
    let id = req.params.id;
    console.log(id)
    let data = await categoryService.deleteCatetoryByID(id);
    return res.status(200).json({
        message: data.message
    })


}
module.exports = {
    getCategory,
    getAddCategory,
    getEditCategory,
    postCatetory,
    // putCategory,
    deleteCategory,
    getApiListCategory,
    postApiCategory,
    deleteApiCategory
}