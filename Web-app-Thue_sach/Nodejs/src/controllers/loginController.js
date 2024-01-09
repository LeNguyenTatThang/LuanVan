import admin from '../models/admin.model'
import axios from "../axios";
const fs = require('fs')

let getLoginPage = async (req, res) => {
    return res.render('auth/login.ejs', {
        msgLogin: req.flash('msgLogin'),
        errLogin: req.flash('errLogin')
    });
}

let getLogin = async (req, res, next) => {
    try {
        let email = req.body.email;
        let matkhau = req.body.matkhau;
        if (!email || !matkhau) {
            req.flash('errLogin', 'vui lòng nhập gmail và mật khẩu')
            return res.redirect('/');
        }
        let adminData = await admin.handleAdminLogin(email, matkhau);
        if (adminData.errcode === 0) {
            req.session.adminData1 = adminData.admin;
            req.flash('msgLogin', adminData.errMessage)
            return res.redirect('home');
        }
        if (adminData.errcode !== 0) {
            req.flash('errLogin', adminData.errMessage)
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


let getDetailAccount = async (req, res) => {
    let adminID = req.query.adminID;
    let detailAdmin = await admin.detailAcount(adminID)
    if (detailAdmin) {
        detailAdmin = detailAdmin.admin;
        return res.render('auth/detailAccount.ejs', { detailAdmin: detailAdmin });
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
    let detailAdmin = await admin.detailAcount(adminID)
    return res.status(200).json({
        admin: detailAdmin.admin
    })

}


let editAccount = async (req, res) => {
    try {
        let id = req.query.id
        console.log('dddddddddddddđ', id)
        let data = await admin.getId(id)
        if (data.errcode == 0) {
            data = data.dataAdmin
            console.log(data)
            return res.render('auth/editAccount.ejs', { data: data })
        } else {
            return res.redirect('/home')
        }

    } catch (error) {

    }
}

const updateAccount = async (req, res) => {
    try {
        let adminData = req.body
        let hinhmoi = {}
        if (req.file || req.file !== undefined) {
            hinhmoi = req.file.filename
        } else {
            hinhmoi = adminData.hinh
        }
        console.log('hinh cu ', adminData.hinh)
        let data = await admin.update(adminData, hinhmoi)
        if (data.errcode == 0) {
            if (req.file && adminData.hinh) {
                try {
                    fs.unlink('src/public/img/' + adminData.hinh, function (err) {
                    });
                } catch (error) {
                    throw error
                }
            }
            req.flash('msgAdmin', data.message)
            return res.redirect('/home')
        } else {
            if (req.file) {
                fs.unlink('src/public/img/' + hinhmoi)
            }
            req.flash('errAdmin', data.message)
            return res.redirect('/home')
        }
    } catch (error) {
        req.flash('errAdmin', 'lỗi Server')
        return res.redirect('/home')
    }
}

module.exports = {
    getLoginPage,
    getLogin,
    getDetailAccount,
    dataAccount,
    editAccount,
    updateAccount
}