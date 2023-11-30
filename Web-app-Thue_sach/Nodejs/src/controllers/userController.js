import user from "../models/user.model"
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const getUser = async (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    let name = req.query.name;
    if (name) {
        let data = await user.getAll(page, name);
        return res.render('user/listUser.ejs', {
            data: data.rows,
            totalPage: data.totalPage,
            name: data.name,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page),

        })
    } else {
        let data = await user.getAll(page, name);
        return res.render('user/listUser.ejs', {
            data: data.rows,
            name: data.name,
            totalPage: data.totalPage,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page)
        })
    }
}

const detailUser = async (req, res) => {
    try {
        let id = req.query.id
        console.log('id', id)
        let data = await user.getId(id)
        console.log('dữ liệu', data)
        if (data.errcode === 0) {
            return res.render('user/detailUser.ejs', {
                data: data.data
            })
        } else {
            return res.redirect('user')
        }
    } catch (error) {
        console.error(error)
    }
}





//api

// api đăng nhập user
const userApiLogin = async (req, res) => {
    let email = req.body.email;
    let matkhau = req.body.matkhau;
    if (!email || !matkhau) {
        return res.status(500).json({
            errcode: 1,
            message: 'vui lòng nhập gmail và mật khẩu'
        })
    }
    let userData = await user.handleUserLogin(email, matkhau);
    return res.status(200).json({
        errcode: userData.errcode,
        message: userData.errMessage,
        user: userData.user ? userData.user : { 'a': 'abc' }
    })
}

//api đăng kí

const Apiregister = async (req, res) => {
    try {
        let data = req.body
        if (!data.ten || !data.email || !data.matkhau) {
            return res.status(400).json({
                status: 400,
                message: "tên, email và mật khẩu không được để trống"
            })
        }
        let checkUsers = await user.checkEmail(data.email)
        if (checkUsers) {
            return res.status(401).json({
                status: 401,
                message: 'email đã tồn tại'
            })
        }
        let userData = await user.registerUser(data);
        console.log("dữ liệu", userData)
        const url = `http://localhost:3000/create-account-ok/${userData.id_users}`;
        await sendConfirmationEmail(data.email, url);
        if (userData.errcode == 0) {
            return res.status(200).json({
                status: 200,
                message: userData.message
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

//xác nhận tài khoản
const accountVerification = async (req, res) => {
    try {
        let id = req.params.id
        let data = await user.updateVerification(id)
        console.log('ff', data)
        if (data.errcode === 0) {
            return res.status(200).json({
                status: 200,
                message: data.message
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: data.message
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

//gửi mail
const sendConfirmationEmail = async (email, url) => {
    const viewsPath = path.join(__dirname, '../views');
    const sourcePath = path.join(viewsPath, 'emailTemplate.ejs');
    const source = fs.readFileSync(sourcePath, 'utf8');
    const template = ejs.compile(source);
    const html = template({ email: email, href: url });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '2023luanvan@gmail.com',
            pass: 'jsnn awej cdqo grmq'
        }
    });
    // Soạn email
    const mailOptions = {
        from: 'Thuê sách',
        to: email,
        url: 'xác thực',
        subject: 'Xác nhận đăng ký',
        html: html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


const apiUpdateUser = async (req, res) => {
    try {
        let data = req.body
        console.log("check data 123>>>>", data)
        let userData = await user.UpdateUser(data);
        if (userData.errcode == 0) {
            return res.status(200).json({
                status: 200,
                message: userData.message
            })
        } else {
            return res.status(401).json({
                status: 401,
                message: 'hh'
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


module.exports = {
    getUser,
    userApiLogin,
    Apiregister,
    apiUpdateUser,
    accountVerification,
    detailUser
}