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
        let data = await user.getId(id)
        if (data.errcode === 0) {
            return res.render('user/detailUser.ejs', {
                msgUsers: req.flash('msgUsers'),
                errUsers: req.flash('errUsers'),
                data: data.data
            })
        } else {
            return res.redirect('user')
        }
    } catch (error) {
        console.error(error)
    }
}

const disableCommentsUsers = async (req, res) => {
    try {
        let data = req.body
        let dataUsers = await user.updatedisableCommentsUsers(data)
        if (dataUsers.errcode === 0) {
            req.flash('msgUsers', dataUsers.message)
            return res.redirect(`/detailUser?id=${data.id}`)
        } else {
            req.flash('errUsers', dataUsers.message)
            return res.redirect(`/detailUser?id=${data.id}`)
        }
    } catch (error) {
        console.error(error)
        req.flash('errUsers', 'lỗi Server')
        return res.redirect(`/detailUser?id=${data.id}`)
    }
}

const DisableBookPosting = async (req, res) => {

    try {
        let data = req.body
        let dataUsers = await user.DisableBook(data)
        if (dataUsers.errcode === 0) {
            req.flash('msgUsers', dataUsers.message)
            return res.redirect(`/detailUser?id=${data.id}`)
        } else {
            req.flash('errUsers', dataUsers.message)
            return res.redirect(`/detailUser?id=${data.id}`)
        }
    } catch (error) {
        console.error(error)
        req.flash('errUsers', 'lỗi Server')
        return res.redirect(`/detailUser?id=${data.id}`)
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
        let checkName = await user.checkNameUssers(data.ten)
        if (checkName) {
            return res.status(402).json({
                status: 402,
                message: 'tên đã tồn tại'
            })
        }
        let checkPassword = await isValidPassword(data.matkhau)
        if (!checkPassword) {
            return res.status(402).json({
                status: 403,
                message: 'Mật khẩu phải có ít nhất 6 chữ số và không có khoảng trắng'
            })
        }

        let userData = await user.registerUser(data);
        if (userData.errcode == 0) {
            const url = `http://localhost:3000/create-account-ok/${userData.id_users}`;
            await sendConfirmationEmail(data.email, url);
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

//kiểm tra mk có đủ sáu chữ số ko
function isValidPassword(password) {
    const regex = /^\d{6,}$/;
    return regex.test(password) && !/\s/.test(password);
}

//xác nhận tài khoản
const accountVerification = async (req, res) => {
    try {
        let id = req.params.id
        console.log('mã id', id)
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
    const sourcePath = path.join(viewsPath, 'email/emailTemplate.ejs');
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
        let hinhmoi = {}
        if (req.file || req.file !== undefined) {
            hinhmoi = req.file.filename
        } else {
            hinhmoi = data.hinh
        }
        let userData = await user.UpdateUser(data, hinhmoi);
        if (userData.errcode == 0) {
            if (req.file && data.hinh) {
                try {
                    fs.unlink('src/public/img/' + data.hinh, function (err) {
                    });
                } catch (error) {
                    throw error
                }
            }
            return res.status(200).json({
                status: 200,
                message: userData.message
            })
        } else {
            if (req.file && hinhmoi) {
                try {
                    fs.unlink('src/public/img/' + hinhmoi, function (err) {
                    });
                } catch (error) {
                    throw error
                }
            }
            return res.status(401).json({
                status: 401,
                message: 'cập nhật thất bại'
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
    detailUser,
    disableCommentsUsers,
    DisableBookPosting
}