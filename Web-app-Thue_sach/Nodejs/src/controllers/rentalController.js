import rental from '../models/rental.model'
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
//api tạo phiếu thuê
const postRental = async (req, res) => {
    try {
        let rentalData = req.body
        let data = await rental.create(rentalData)
        if (data.errcode == 0) {
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

//xác nhận cho thuê
const confirmRental = async (req, res) => {
    try {
        let rentalData = req.body
        let data = await rental.upStatus1(rentalData)
        if (data.errcode === 0) {
            let dataMail = await rental.getRenalByIdRental(rentalData.id)
            await sendConfirmationEmail(dataMail);
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

const sendConfirmationEmail = async (data) => {
    const viewsPath = path.join(__dirname, '../views');
    const sourcePath = path.join(viewsPath, 'email/emailRental.ejs');
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
        from: '2023luanvan@gmail.com',
        to: data.email,
        subject: 'Xác nhận đăng ký',
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


//xác nhận nhận hàng 
const received = async (req, res) => {
    try {
        let rentalData = req.body
        console.log(rentalData)
        let data = await rental.upStatus2(rentalData)
        if (data.errcode === 0) {
            const job = schedule.scheduleJob('*/5 * * * *', async () => {
                // io.emit('nearDueDate', { rentalId: data.id, messageRentail: 'Cảnh báo: Còn hai ngày đến ngày trả' });
                console.log('sắp tới ngày trả hàng')
            });
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

//chờ trả
const returned = async (req, res) => {
    try {
        let rentalData = req.body
        let data = await rental.upStatus3(rentalData)
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

//hoàn tất quá trình thuê
const completed = async (req, res) => {
    try {
        let rentalData = req.body
        let data = await rental.upStatus4(rentalData)
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

//api danh sách đơn hàng thuê
const ListRent = async (req, res) => {
    try {
        let rentalData = req.body
        let data = await rental.getRent(rentalData)
        if (data.errcode === 0) {
            return res.status(200).json({
                status: 200,
                data: data,
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

//api danh sách đơn hàng chờ gửi 
const ListRent1 = async (req, res) => {
    try {
        let rentalData = req.body
        rentalData.trangthai = 1
        let data = await rental.getRent(rentalData)
        if (data.errcode === 0) {
            return res.status(200).json({
                status: 200,
                data: data,
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

//api danh sách đơn hàng đang thuê
const ListRent2 = async (req, res) => {
    try {
        let rentalData = req.body
        rentalData.trangthai = 2
        let data = await rental.getRent(rentalData)
        if (data.errcode === 0) {
            return res.status(200).json({
                status: 200,
                data: data,
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

//api danh sách đơn hàng chờ trả
const ListRent3 = async (req, res) => {
    try {
        let rentalData = req.body
        rentalData.trangthai = 3
        let data = await rental.getRent(rentalData)
        if (data.errcode === 0) {
            return res.status(200).json({
                status: 200,
                data: data,
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

//api danh sách đơn hàng hoàn tất
const ListRent4 = async (req, res) => {
    try {
        let rentalData = req.body
        rentalData.trangthai = 4
        let data = await rental.getRent(rentalData)
        if (data.errcode === 0) {
            return res.status(200).json({
                status: 200,
                data: data,
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

//api danh sách đơn hàng cho thuê
const rentalOrders = async (req, res) => {
    try {
        let rentalData = req.body
        let data = await rental.getRentOrder(rentalData)
        if (data.errcode === 0) {
            return res.status(200).json({
                status: 200,
                data: data,
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

//api danh sách đơn hàng cho thuê chờ xác nhận
const rentalOrders1 = async (req, res) => {
    try {
        let rentalData = req.body
        rentalData.trangthai = 1
        let data = await rental.getRentOrder(rentalData)
        if (data.errcode === 0) {
            return res.status(200).json({
                status: 200,
                data: data,
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




//api danh sách đơn hàng cho thuê đang thuê
const rentalOrders2 = async (req, res) => {
    try {
        let rentalData = req.body
        rentalData.trangthai = 2
        let data = await rental.getRentOrder(rentalData)
        if (data.errcode === 0) {
            return res.status(200).json({
                status: 200,
                data: data,
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

//api danh sách đơn hàng cho thuê đang chờ trả
const rentalOrders3 = async (req, res) => {
    try {
        let rentalData = req.body
        rentalData.trangthai = 3
        let data = await rental.getRentOrder(rentalData)
        if (data.errcode === 0) {
            return res.status(200).json({
                status: 200,
                data: data,
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

//api danh sách đơn hàng cho thuê hoàn tất
const rentalOrders4 = async (req, res) => {
    try {
        let rentalData = req.body
        rentalData.trangthai = 4
        let data = await rental.getRentOrder(rentalData)
        if (data.errcode === 0) {
            return res.status(200).json({
                status: 200,
                data: data,
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

const testthuhtmlemail = async (req, res) => {
    let rentalData = req.body
    console.log('ggggg')
    let dataMail = await rental.getRenalByIdRental(15)
    console.log(dataMail)
    return res.render('email/emailRental.ejs', {
        data: dataMail.data,
        books: dataMail.books
    })

}

module.exports = {
    postRental,
    confirmRental,
    completed,
    returned,
    received,
    ListRent,
    rentalOrders,
    ListRent1,
    ListRent2,
    ListRent3,
    ListRent4,
    rentalOrders1,
    rentalOrders2,
    rentalOrders3,
    rentalOrders4,
    testthuhtmlemail

}