import comment from '../models/comment.model'


//api danh sách bình luận
const listComment = async (req, res) => {
    try {
        let dataComment = req.body.id
        let data = await comment.getAll(dataComment)
        console.log(data)
        if (data.errcode === 0) {
            return res.status(200).json({
                status: 200,
                data: data.rows,
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

//api thêm bình luận
const createComment = async (req, res) => {
    try {
        let dataComment = req.body
        let data = await comment.create(dataComment)
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


//cập nhật trạng thái bình luận
const updateCpmmentStatus = async (req, res) => {
    try {
        let id = req.body.id;
        let trangthai = req.body.trangthai
        console.log(trangthai, id)
        let data = await comment.updatestatus(id, trangthai);
        console.log(data)
        if (data.errcode == 0) {
            return res.json({
                message: data.message
            })
        } else {
            return res.json({
                message: data.message
            })
        }
    } catch (error) {
        console.error(error)
        return res.json({
            message: 'lỗi Server'
        })
    }
}

module.exports = {
    createComment,
    listComment,
    updateCpmmentStatus
}