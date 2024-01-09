
import axios from "../axios";
import book from '../models/book.model'
import comment from '../models/comment.model'
const fs = require('fs');

const book1 = async (req, res) => {
    return res.render('book/book.ejs')
}

const getbook = async (req, res) => {
    try {
        let page = req.query.page ? req.query.page : 1;
        let name = req.query.name;
        let trangthaiduyet = "choduyet"
        let data;
        data = await book.getApprovalStatus(page, name, trangthaiduyet);
        return res.render('book/listBook.ejs', {
            data: data.rows,
            name: data.name,
            totalPage: data.totalPage,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page)
        })
    } catch (error) {
        console.error(error)
    }
}

const getbrowebook = async (req, res) => {
    try {
        let page = req.query.page ? req.query.page : 1;
        let name = req.query.name;
        let trangthaiduyet = "duocduyet"
        let data;
        data = await book.getApprovalStatus(page, name, trangthaiduyet);
        return res.render('book/listbrowebook.ejs', {
            data: data.rows,
            name: data.name,
            totalPage: data.totalPage,
            message: data.message,
            errcode: data.errcode,
            page: parseInt(page)
        })
    } catch (error) {
        console.error(error)
    }
}

//chi tiết sách đã được duyệt
const detailBroweBook = async (req, res) => {
    try {
        let id = req.query.id;
        let name = req.query.name || '';
        let data = await book.getId(id)
        if (data.book && data.book.id) {
            let dataCmt = await comment.getComment(data.book.id, name);
            return res.render('book/detailBroweBook.ejs', {
                data: data.book,
                dataCmt: dataCmt.rows,
                name: dataCmt.name,
                msgBook: req.flash('msgBook'),
                errBook: req.flash('errBook'),
            });
        } else {
            return res.redirect('/get-broweBook');
        }
    } catch (error) {
        console.error(error);
        return res.redirect('/get-broweBook');
    }

}

const getDetailBook = async (req, res) => {
    let id = req.query.id;
    let data = await book.getId(id)
    if (data.errcode === 0) {
        return res.render('book/detailBook.ejs', {
            data: data.book, msgBook: req.flash('msgBook'),
            errBook: req.flash('errBook'),
        });
    } else {
        return res.redirect('/book');
    }

}

//cập nhật trạng thái duyệt sách
const BrowseBooks = async (req, res) => {
    try {
        let id = req.body.id;
        let trangthaiduyet = req.body.trangthaiduyet
        await book.updateApprovalStatus(id, trangthaiduyet);
        return res.redirect('/book')
    } catch (error) {
        console.error(error)
        return res.redirect('/book')
    }
}

//từ chối duyệt và thông báo
const BoosMessage = async (req, res) => {
    try {
        let data = req.body;
        if (!data.noidung) {
            req.flash('msgBook', "Yêu cầu ghi lý do không duyệt")
            return res.redirect(`/get-detailbook?id=${data.id}`)
        }
        let dataMsr = await book.createMessage(data)
        req.flash('msgBook', dataMsr.message)
        return res.redirect(`/get-detailbook?id=${data.id}`)
    } catch (error) {
        console.error(error)
        req.flash('errBook', "lỗi Server")
    }
}

//API



//api them sach
const postBook = async (req, res, next) => {
    try {
        let bookData = req.body
        if (req.file && req.file !== undefined) {
            bookData.hinh = req.file.filename
        }
        if (!req.file) {
            return res.status(401).json({
                status: 401,
                message: 'không có hình hoặc sai định dạng'
            })
        }
        let data = await book.create(bookData)
        if (data.errcode === 0) {
            req.io.emit('updateData');
            console.log('Event updateData emitted');
            return res.status(200).json({
                status: 200,
                message: data.message
            })
        } else {
            if (req.file) {
                try {
                    fs.unlink('src/public/img/' + bookData.hinh, function (err) {
                    });
                } catch (error) {
                    throw error
                }
            }
            return res.status(402).json({
                status: 402,
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



//api ds sach
const postApiListBookUser = async (req, res) => {
    try {
        let page = req.query.page ? req.query.page : 1;
        let bookData = await book.getTrangthai1(page)
        return res.status(200).json({
            data: bookData.rows,
            name: bookData.name,
            totalPage: bookData.totalPage,
            errcode: bookData.errcode,
            message: bookData.message,
            data: bookData.rows ? bookData.rows : 'không có dữ liệu'
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'lỗi Server'
        })
    }

}


//api lấy sách theo id của users
const bookByIdUsers = async (req, res) => {
    try {
        let id_users = req.query.id_users
        let loai = req.query.loai
        let bookData = await book.getBookByIdUsers(id_users, loai)
        if (bookData.errcode == 0) {
            return res.status(200).json({
                status: 200,
                data: bookData.rows,
                message: bookData.message,
                data: bookData.rows
            })
        } else {
            return res.status(404).json({
                errcode: bookData.errcode,
                message: bookData.message,
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

//api lấy sách không đuọc duyệt theo id của users
const bookByIdUsersUnapproved = async (req, res) => {
    try {
        let id_users = req.query.id_users
        let loai = req.query.loai
        let bookData = await book.getBookUnapprovedByIdUsers(id_users, loai)
        if (bookData.errcode == 0) {
            return res.status(200).json({
                status: 200,
                data: bookData.rows,
                message: bookData.message,
                data: bookData.rows
            })
        } else {
            return res.status(404).json({
                errcode: bookData.errcode,
                message: bookData.message,
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

//api lấy id của sách
const getApiDetailBooks = async (req, res) => {
    try {
        let id = req.query.id
        let data = await book.getId(id)
        if (data.errcode == 0) {
            return res.status(200).json({
                data: data.book ? data.book : 'ko',
                status: 200,
                message: data.message,
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: 'id không tồn tại'
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'lỗi Server'
        })
    }
}

const updateBook = async (req, res) => {
    try {
        let data = req.body
        let hinhmoi
        let dataImage = await book.getId(data.id)
        if (req.file) {
            hinhmoi = req.file.filename
        } else {
            hinhmoi = dataImage.book.hinh
        }
        let dataBook = await book.update(data, hinhmoi)
        if (dataBook.errcode == 0) {
            if (req.file) {
                try {
                    fs.unlink('src/public/img/' + dataImage.book.hinh, function (err) {
                    });
                } catch (error) {
                    throw error
                }
            }
            return res.status(200).json({
                status: 200,
                message: dataBook.message
            })
        } else {
            if (req.file) {
                try {
                    fs.unlink('src/public/img/' + hinhmoi, function (err) {
                    });
                } catch (error) {
                    throw error
                }
            }
            return res.status(400).json({
                status: 400,
                message: dataBook.message
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

const bookMessage = async (req, res) => {
    try {
        let id_sach = req.body.id_sach
        let dataBook = await book.getBookMessage(id_sach)
        if (dataBook.errcode == 0) {
            return res.status(200).json({
                status: 200,
                message: dataBook.dataRow
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: dataBook.message
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

const upbookOnline = async (req, res) => {
    try {
        let data = req.body
        let hinhmoi
        let dataImage = await book.getId(data.id)
        if (req.file) {
            hinhmoi = req.file.filename
        } else {
            hinhmoi = dataImage.book.hinh
        }
        let dataBook = await book.updateBookOnline(data, hinhmoi)
        if (dataBook.errcode == 0) {
            if (req.file) {
                try {
                    fs.unlink('src/public/img/' + dataImage.book.hinh, function (err) {
                    });
                } catch (error) {
                    throw error
                }
            }
            return res.status(200).json({
                status: 200,
                message: dataBook.message
            })
        } else {
            if (req.file) {
                try {
                    fs.unlink('src/public/img/' + hinhmoi, function (err) {
                    });
                } catch (error) {
                    throw error
                }
            }
            return res.status(400).json({
                status: 400,
                message: dataBook.message
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

//api danh sach theo theloai va tacgia
const bookByCatetoryAndAuthor = async (req, res) => {
    try {
        let theloai_id = req.query.theloai_id
        let loai = req.query.loai
        let ten = req.query.ten
        let data = await book.getBookByCatetoryAndAuthor(theloai_id, loai, ten)
        if (data.errcode === 0) {
            return res.status(200).json({
                status: 200,
                data: data.rows,
            })
        } else {
            return res.status(404).json({
                status: 404,
                data: data.message
            })

        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: "lỗi Server"
        })
    }
}

const apiRating = async (req, res) => {
    try {
        let data = req.body
        if (!data.users_id) {
            return res.status(403).json({
                status: 403,
                message: "vui lòng đăng nhập trước khi đánh giá",
            })
        }
        let dataRating = await book.rating(data)
        if (dataRating.errcode == 0) {
            return res.status(200).json({
                status: 200,
                message: dataRating.message,
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: dataRating.message,
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: "lỗi Server"
        })
    }
}

module.exports = {
    getbook,
    getDetailBook,
    postBook,
    getApiDetailBooks,
    BrowseBooks,
    postApiListBookUser,
    getbrowebook,
    BoosMessage,
    updateBook,
    book1,
    detailBroweBook,
    bookByIdUsers,
    bookByCatetoryAndAuthor,
    upbookOnline,
    apiRating,
    bookMessage,
    bookByIdUsersUnapproved
}

