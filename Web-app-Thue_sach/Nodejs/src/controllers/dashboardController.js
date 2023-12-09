import dashboard from '../models/dashboard.model'
import rental from '../models/rental.model'
import user from '../models/user.model'
const schedule = require('node-schedule');

const dashboardPage = async (req, res) => {
    try {
        const chartData = await calculateOverallRevenue(req, res);
        const chartNewAccount = await newAccountStatistics(req, res);
        const users = await user.getAll()
        const usersYear = await user.getYear()
        console.log(users)
        console.log('user', usersYear)
        console.log('bieu do', chartData)
        console.log('tai khoan', chartNewAccount)
        return res.render('dashboard/dashboard.ejs', {
            chartData,
            users,
            usersYear,
            chartNewAccount,
            msgLogin: req.flash('msgLogin'),
        });
    } catch (error) {
        console.error("Lỗi trong quá trình xử lý trang dashboard:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }


}

//thống kê số tài khoản được tạo trong tháng
const newAccountStatistics = async (req, res) => {
    try {
        let data = await user.newAccountStatistics()
        if (!Array.isArray(data.rows)) {
            console.error("Dữ liệu không phải là một mảng:", data.rows);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const chartNewAccount = {
            series: [
                {
                    name: 'tài khoản đăng kí',
                    data: data.rows.map(row => ({
                        x: `${row.nam}-${row.thang}`,
                        y: parseInt(row.taikhoanmoi)
                    }))
                }
            ],
            options: {
                chart: {
                    type: 'line'
                },
                xaxis: {
                    categories: data.rows.map(row => `${row.nam}-${row.thang}`)
                }
            }
        };
        return chartNewAccount;
    } catch (error) {
        console.error("Lỗi trong quá trình tính toán số tài khoản được tạo", error);

    }
}

//thống kê tổng doanh thu của chủ tiệm
const calculateOverallRevenue = async (req, res) => {
    try {
        let data = await rental.calculateOverallRevenue()
        console.log(data.data)
        if (!Array.isArray(data.data)) {
            console.error("Dữ liệu không phải là một mảng:", data.data);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        data.data.sort((a, b) => a.chutiem_id - b.chutiem_id || (a.nam * 12 + a.thang) - (b.nam * 12 + b.thang));
        const groupedData = groupBy(data.data, 'chutiem_id');

        const series = Object.values(groupedData).map(group => ({
            name: `Chủ tiệm ${group[0].chutiem_id}`,
            data: group.map(row => ({
                x: `${row.nam}-${row.thang}`,
                y: parseInt(row.tongdoanhthu)
            }))
        }));

        const chartData = {
            series: series,
            options: {
                chart: {
                    type: 'line'
                },
                xaxis: {
                    categories: data.data.map(row => `${row.nam}-${row.thang}`)
                }
            }
        };

        console.log(chartData)
        return chartData;
    } catch (error) {
        console.error("Lỗi trong quá trình tính toán doanh thu:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

function groupBy(arr, property) {
    return arr.reduce(function (acc, obj) {
        const key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}

// '0 0 1 * *'
// */5 * * * * *
const job = schedule.scheduleJob('*0 0 1 * *', async () => {
    console.log('Thực hiện thống kê doanh thu theo tháng...');
    let data = await calculateOverallRevenue();
    console.log(data)
});

const dashboardLogAccess = async (req, res, next) => {
    try {
        const diachi_ip = req.ip || req.connection.remoteAddress;
        const trangtruycap = req.originalUrl;
        console.log(diachi_ip, trangtruycap);

        // Sử dụng await khi gọi pool.execute
        const data = await dashboard.logAccess(diachi_ip, trangtruycap);
        const { errcode, message } = data;

        if (errcode === 0) {
            next();
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};



module.exports = {
    dashboardPage,
    dashboardLogAccess,
    newAccountStatistics
}