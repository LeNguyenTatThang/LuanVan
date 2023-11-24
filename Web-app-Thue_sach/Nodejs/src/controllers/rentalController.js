import rental from '../models/rental.model'

const postRental = async (req, res) => {
    try {
        let rentalData = req.body
        console.log('data', rentalData)
        let data = await rental.create(rentalData)
        return res.status(200).json({
            status: 200,
            message: data.message
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'lỗi hệ thống'
        })
    }
}

const confirmRental = async (req, res) => {
    try {
        let rentalData = req.body
        let data = await rental.upStatus1(rentalData)
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
        return res.status(500).json({
            status: 500,
            message: 'lỗi hệ thống'
        })
    }
}

const deliveryRental = async (req, res) => {
    try {
        let rentalData = req.body
        let data = await rental.upStatus2(rentalData)
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
        return res.status(500).json({
            status: 500,
            message: 'lỗi hệ thống'
        })
    }
}

const received = async (req, res) => {
    try {
        let rentalData = req.body
        console.log(rentalData)
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
        return res.status(500).json({
            status: 500,
            message: 'lỗi hệ thống'
        })
    }
}

const returned = async (req, res) => {
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
        return res.status(500).json({
            status: 500,
            message: 'lỗi hệ thống'
        })
    }
}

const completed = async (req, res) => {
    try {
        let rentalData = req.body
        let data = await rental.upStatus5(rentalData)
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
        return res.status(500).json({
            status: 500,
            message: 'lỗi hệ thống'
        })
    }
}

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
        return res.status(500).json({
            status: 500,
            message: 'lỗi hệ thống'
        })
    }
}

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
        return res.status(500).json({
            status: 500,
            message: 'lỗi hệ thống'
        })
    }
}
module.exports = {
    postRental,
    confirmRental,
    deliveryRental,
    completed,
    returned,
    received,
    ListRent,
    rentalOrders
}