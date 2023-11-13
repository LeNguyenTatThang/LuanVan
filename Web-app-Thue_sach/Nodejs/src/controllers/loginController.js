import pool from "../config/connectDB";
import loginService from "../services/loginService";
import axios from "../axios";


let getLoginPage = async (req, res) => {
    return res.render('auth/login.ejs', {
        msgLogin: req.flash('msgLogin'),
        errLogin: req.flash('errLogin')
    });
}



let getApiLogin = async (req, res) => {
    let email = req.body.email;
    let matkhau = req.body.matkhau;
    if (!email || !matkhau) {
        return res.status(400).json({
            errcode: 1,
            message: 'vui lòng nhập gmail và mật khẩu'
        })
    }
    let adminData = await loginService.handleAdminLogin(email, matkhau);
    return res.status(200).json({
        errcode: adminData.errcode,
        message: adminData.errMessage,
        admin: adminData.admin ? adminData.admin : { 'a': 'abc' }
    })
}



let getLogin = async (req, res, next) => {
    try {
        let email = req.body.email;
        let matkhau = req.body.matkhau;
        let adminData = await axios.post('/api-adminlogin', { email, matkhau })
        if (adminData.errcode === 0) {
            req.session.adminData1 = adminData.admin.email;
            req.flash('msgLogin', adminData.message)
            return res.redirect('home');
        }
        if (adminData.errcode !== 0) {
            req.flash('errLogin', adminData.message)

            return res.redirect('/');
        }
    } catch (error) {
        if (error.response) {
            if (error.response.data) {
                error.response.data.message
            }
        }
        console.log(error.response)
    }

}


let dataAccount = async (req, res) => {
    let adminID = req.query.adminID;
    console.log(adminID)
    if (!adminID) {
        return res.status(500).json({
            errcode: 1,
            message: 'missing inputs parmeter'
        })
    }
    let detailAdmin = await loginService.detailAcount(adminID)
    return res.status(200).json({
        admin: detailAdmin.admin
    })

}


let getDetailAccount = async (req, res) => {
    let adminID = req.query.adminID;
    let detailAdmin = await axios.get('/api-admin?adminID=' + adminID);
    if (detailAdmin) {
        detailAdmin = detailAdmin.admin;
        return res.render('auth/detailAccount.ejs', { detailAdmin: detailAdmin });
    }
}


module.exports = {
    getLoginPage,
    getLogin,
    getDetailAccount,
    getApiLogin,
    dataAccount
}