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
    } catch {
        return res.status(500).json({
            status: 500,
            message: 'lỗi hệ thống'
        })
    }
}

module.exports = {
    postRental
}