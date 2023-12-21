import dashboard from '../models/dashboard.model'
import rental from '../models/rental.model'
import user from '../models/user.model'
const schedule = require('node-schedule');

const dashboardPage = async (req, res) => {
    try {
        // const chartData = await calculateOverallRevenue(req, res);
        // const chartNewAccount = await newAccountStatistics(req, res);
        const users = await user.getUsers()
        const usersYear = await user.getYear()
        // console.log('bieu do', chartData)
        // console.log('tai khoan', chartNewAccount)
        return res.render('dashboard/dashboard.ejs', {
            // chartData,
            users,
            usersYear,
            // chartNewAccount,
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
        let nam = req.body.nam
        let data = await user.newAccountStatistics(nam)
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
        res.json(chartNewAccount);
    } catch (error) {
        console.error("Lỗi trong quá trình tính toán số tài khoản được tạo", error);

    }
}

//thống kê tổng doanh thu của chủ tiệm
const calculateOverallRevenue = async (req, res) => {
    try {
        let name = req.body.name
        let data = await rental.calculateOverallRevenue(name)
        if (!data.data || data.data.length === 0) {
            return res.json({ message: 'Không có dữ liệu' });
        }
        const dataArray = Array.isArray(data.data) ? data.data : [data.data];
        dataArray.sort((a, b) => a.chutiem_id - b.chutiem_id || (a.nam * 12 + a.thang) - (b.nam * 12 + b.thang));
        const groupedData = groupBy(dataArray.filter(item => item && item.chutiem_id), 'chutiem_id');

        const series = Object.values(groupedData).map(group => ({
            name: `Chủ tiệm ${group[0].ten}`,
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
                    categories: dataArray.map(row => `${row.nam}-${row.thang}`)
                }
            }
        };

        res.json(chartData)
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
    newAccountStatistics,
    calculateOverallRevenue
}