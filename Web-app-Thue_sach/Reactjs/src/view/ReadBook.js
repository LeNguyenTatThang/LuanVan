import React, { useEffect, useState } from 'react'
import { apiUpdateBook, apigetBookRead, detailBookUser } from '../Service/UserService'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import iziToast from 'izitoast';
export default function ReadBook() {
    const [book, setBook] = useState();
    const [book1, setBook1] = useState();
    const userData = useSelector((state) => state.user);
    const getBook = async () => {

        let res = await apigetBookRead(userData.userInfo.id, 1);
        if (res && res.status === 200) {
            setBook(res.data)

        }
    }
    const getBook1 = async () => {

        let res = await apigetBookRead(userData.userInfo.id, 0);
        if (res && res.status === 200) {
            setBook1(res.data)

        }
    }
    console.log("check book>>>>: ", book)

    const [showModal, setShowModal] = React.useState(false);
    const [modalBookId, setModalBookId] = React.useState(null)
    const [detail, setDetail] = useState([]);
    const [editedContent, setEditedContent] = useState(detail.noidung);
    const [editedPrice, setEditedPrice] = useState(detail.gia);
    const [editedDeposit, setEditedDeposit] = useState(detail.tiencoc);
    const handleInputChange = (e) => {
    }
    console.log(editedPrice)
    console.log(editedDeposit)
    const handleEditInfo = async (bookId) => {
        // Sử dụng hook để đặt giá trị id vào state
        setModalBookId(bookId);
        try {
            let data = await detailBookUser(bookId);
            if (data && data.status === 200) {
                setDetail(data.data);
            }

        } catch (error) {
            console.error('Error fetching book details:', error);
        }
        // Hiển thị modal
        setShowModal(true);
    }
    const [previewImage, setPreviewImage] = useState(null);
    const [hinh, setHinh] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Tạo một URL để hiển thị trước hình
            const imageUrl = URL.createObjectURL(file);
            // Cập nhật state hoặc thực hiện các bước khác tùy thuộc vào yêu cầu của bạn
            setPreviewImage(imageUrl);
            setHinh(file);
        }
    };

    useEffect(() => {
        getBook();
        getBook1();
    }, [detail])
    console.log(detail)
    const [tinhtrang, setTinhTrang] = useState();
    const options = [
        { value: 1, label: 'Sách cũ' },
        { value: 0, label: 'Sách mới' },
    ];
    const handleChangeTinhTrang = (selectedOption) => {
        setTinhTrang(selectedOption);
    };
    const handlePriceChange = (e) => {
        // Kiểm tra xem giá trị mới chỉ chứa ký tự số
        const newValue = e.target.value;
        if (/^\d*$/.test(newValue)) {
            setEditedPrice(newValue);
        }
    };

    const handleDepositChange = (e) => {
        // Kiểm tra xem giá trị mới chỉ chứa ký tự số
        const newValue = e.target.value;
        if (/^\d*$/.test(newValue)) {
            setEditedDeposit(newValue);
        }
    };
    const handleSaveChange = async (id) => {
        let change = await apiUpdateBook(id, hinh, tinhtrang, editedPrice, editedDeposit)
        if (change && change.status === 200) {
            iziToast.success({
                title: "Sửa thành công",
                position: "topRight",
                message: change.message
            })
        }
    }
    const handleCloseChange = () => {
        setShowModal(false);
        setPreviewImage();
    }
    return (
        <>
            <div className="max-w-6xl mx-auto overflow-x-auto shadow-md">
                <h2 className="text-2xl font-bold mb-4">Sách đọc trực tuyến</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Hình</th>
                            <th className="py-2 px-4 border-b">Tên</th>
                            <th className="py-2 px-4 border-b">Duyệt</th>
                            <th className="py-2 px-4 border-b">Thêm Chương</th>
                        </tr>
                    </thead>
                    <tbody>
                        {book && book.length > 0 &&
                            book.map((item, index) => (
                                <tr key={index} className='shadow-sm'>
                                    <td className=" py-2 px-4 border-b">
                                        <img src={`http://localhost:8000/img/${item.hinh}`}
                                            alt={`${item.hinh}`} className="w-16 h-16 rounded-full" />
                                    </td>
                                    <td className="py-2 px-4 border-b">{item.ten}</td>
                                    <td className="py-2 px-4 border-b">
                                        {item.trangthaiduyet === 'choduyet' ?
                                            <><div className="bg-stone-400 text-white px-4 py-2 rounded">Chờ duyệt</div></>
                                            :
                                            <><div className="bg-blue-400 text-white px-4 py-2 rounded">Đã được duyệt</div></>
                                        }
                                    </td>

                                    <td className="py-2 px-4 border-b">
                                        {item.trangthaiduyet === 'choduyet' ? <>Hãy chờ duyệt sách</> : <><Link to={`/post-chapter/${item.id}`}>
                                            <button className="bg-green-500 text-white px-4 py-2 rounded">Thêm Chương</button>
                                        </Link></>}

                                    </td>

                                </tr>
                            ))

                        }

                        {/* Thêm các dòng khác tương tự cho từng sách */}
                    </tbody>
                </table>
            </div>
            <br />
            <div className="max-w-6xl mx-auto overflow-x-auto shadow-md">
                <h2 className="text-2xl font-bold mb-4">Sách thuê</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Hình</th>
                            <th className="py-2 px-4 border-b">Tên</th>
                            <th className="py-2 px-4 border-b">Duyệt</th>
                            <th className="py-2 px-4 border-b">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {book1 && book1.length > 0 &&
                            book1.map((item, index) => (
                                <tr key={index} className='shadow-sm'>
                                    <td className=" py-2 px-4 border-b">
                                        <img src={`http://localhost:8000/img/${item.hinh}`}
                                            alt={`${item.hinh}`} className="w-16 h-16 rounded-full" />

                                    </td>
                                    <td className="py-2 px-4 border-b">{item.ten}</td>
                                    <td className="py-2 px-4 border-b">
                                        {item.trangthaiduyet === 'choduyet' ?
                                            <><div className="bg-stone-400 text-white px-4 py-2 rounded">Chờ duyệt</div></>
                                            :
                                            <><div className="bg-blue-400 text-white px-4 py-2 rounded">Đã được duyệt</div></>
                                        }
                                    </td>

                                    <td className="py-2 px-4 border-b">
                                        {item.trangthaiduyet === 'choduyet' ? <>Hãy chờ duyệt sách</> : <>
                                            <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-2 w-48"
                                                onClick={() => handleEditInfo(item.id)}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-red-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                                <span>Sửa thông tin</span>
                                            </button>

                                            <button className="bg-red-500 text-white px-4 py-2 rounded flex items-center space-x-2 mt-4 w-48">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-yellow-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                                <span>Ẩn sách</span>
                                            </button>
                                        </>}

                                    </td>

                                </tr>
                            ))

                        }

                        {/* Thêm các dòng khác tương tự cho từng sách */}
                    </tbody>
                </table>
            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-3/5 my-6 mx-auto">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold w-96">Thông tin sách</h3>
                                </div>
                                <div className="relative p-6 flex-auto mx-auto">
                                    <div className=" flex items-center space-x-4">
                                        <div>
                                            <img
                                                src={previewImage || `http://localhost:8000/img/${detail.hinh}`}
                                                alt={previewImage ? "Preview Image" : detail.hinh}
                                                className="w-16 h-16 rounded-full"
                                            />
                                            <br />
                                            <input
                                                type="file"
                                                id="imageInput"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            /></div>
                                        <div>
                                            <div className="mt-4">
                                                <label htmlFor="bookName" className="font-bold block">Tên sách:</label>
                                                <input
                                                    type="text"
                                                    id="bookName"
                                                    className="border p-2 w-full"
                                                    value={JSON.stringify(detail.ten).replace(/^"(.*)"$/, '$1')}
                                                    onChange={(e) => handleInputChange(e, 'ten')}
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <label htmlFor="author" className="font-bold block">Tác giả:</label>
                                                <input
                                                    type="text"
                                                    id="author"
                                                    className="border p-2 w-full"
                                                    value={JSON.stringify(detail.tentacgia).replace(/^"(.*)"$/, '$1')}
                                                    onChange={(e) => handleInputChange(e, 'tentacgia')}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="mt-4">
                                        <div>
                                            <p>
                                                <span className="font-bold">Nội dung:</span>
                                                <input
                                                    type="text"
                                                    id="author"
                                                    className="border p-2 w-full"
                                                    value={editedContent}
                                                    onChange={(e) => setEditedContent(e.target.value)}
                                                />
                                            </p>
                                            <p>
                                                <span className="font-bold">Giá:</span>
                                                <input
                                                    type="number"
                                                    id="price"
                                                    className="border p-2 w-full"
                                                    value={detail.gia}
                                                    onChange={handlePriceChange}
                                                />
                                            </p>
                                            <p>
                                                <span className="font-bold">Giá cọc:</span>
                                                <input
                                                    type="number"
                                                    id="deposit"
                                                    className="border p-2 w-full"
                                                    value={detail.tiencoc}
                                                    onChange={handleDepositChange}
                                                />
                                            </p>
                                        </div>
                                        <div className="mt-4">
                                            <label htmlFor="bookStatus" className="font-bold block">Trạng thái sách:</label>
                                            <Select
                                                id="bookStatus"
                                                options={options}
                                                value={options.find(option => option.value === parseInt(detail.tinhtrang))}
                                                onChange={(selectedOption) => handleChangeTinhTrang(selectedOption, 'tinhtrang')}
                                                getOptionLabel={(option) => {
                                                    if (option.value === 1) {
                                                        return 'Sách mới';
                                                    } else {
                                                        return 'Sách cũ';
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleCloseChange}
                                    >
                                        Đóng
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleSaveChange(detail.id)}
                                    >
                                        Lưu thay đổi
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}
