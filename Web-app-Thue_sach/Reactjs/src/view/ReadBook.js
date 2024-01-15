import React, { useEffect, useState } from 'react'
import { apiListChapter, apiUpdateBook, apiUpdateChapter, apigetBookRead, callApiChapter, detailBookUser } from '../Service/UserService'
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
    const [showModal2, setShowModal2] = React.useState(false);
    const [showModal1, setShowModal1] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [modalBookId, setModalBookId] = React.useState(null)
    const [detail, setDetail] = useState([]);
    const [noidung, setEditedContent] = useState();
    const [gia, setEditedPrice] = useState();
    const [tiencoc, setEditedDeposit] = useState();
    const [ten, setTen] = useState()
    const handleInputChange = (e) => {
    }

    const handleEditInfo = async (bookId) => {
        // Sử dụng hook để đặt giá trị id vào state
        setModalBookId(bookId);
        try {
            let data = await detailBookUser(bookId);
            if (data && data.status === 200) {
                setDetail(data.data);
                setTen(data.data.ten)
                setEditedDeposit(data.data.tiencoc)
                setEditedPrice(data.data.gia)
                setEditedContent(data.data.noidung)
            }

        } catch (error) {
            console.error('Error fetching book details:', error);
        }
        // Hiển thị modal
        setShowModal(true);
    }
    const handleEditInfo1 = async (bookId) => {
        // Sử dụng hook để đặt giá trị id vào state
        setModalBookId(bookId);
        try {
            let data = await detailBookUser(bookId);
            if (data && data.status === 200) {
                setDetail(data.data);
                setTen(data.data.ten);
                setEditedContent(data.data.noidung);
            }

        } catch (error) {
            console.error('Error fetching book details:', error);
        }
        // Hiển thị modal
        setShowModal1(true);
    }
    const [listChapter, setListChapter] = useState();
    const [sach_id, setSach_id] = useState();
    const handleEditInfo2 = async (bookId) => {
        setSach_id(bookId)
        try {
            let data = await apiListChapter(bookId);
            if (data && data.status === 200) {
                setListChapter(data.data)
            }
            console.log(listChapter, "danh sach chuong")

        } catch (error) {
            console.error('Error fetching book details:', error);
        }
        // Hiển thị modal
        setShowModal2(true);
    }
    const array = Array.isArray(listChapter)
        ? listChapter.map((res) => ({
            label: res.tieude,
            value: res.chuong
        }))
        : [];
    const [chuong, setChuong] = useState();
    const [chapterData, setChapterData] = useState([]);
    const handleChangeCate = async (selectedOption) => {

        setChuong(selectedOption.value);
        response();

    };
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [id, setId] = useState();

    const response = async () => {
        let resp = await callApiChapter(sach_id, chuong);
        if (resp && resp.status === 200) {
            setChapterData(resp.data);
            setTitle(resp.data.tieude);
            setContent(resp.data.noidung);
            setId(resp.data.id);
        }
    };
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
        response();
        if (chapterData && chapterData.tieude && chapterData.noidung) {
            // Cập nhật UI
            setChapterData(chapterData);
        }
    }, [detail, sach_id, chuong])
    console.log(detail)
    const [tinhtrang, setTinhTrang] = useState();
    const options = [
        { value: 1, label: 'Hiện sách' },
        { value: 0, label: 'Ẩn sách' },
    ];
    const handleChangeTinhTrang = (selectedOption) => {
        setTinhTrang(selectedOption);
    };

    const handleSaveChange = async (id) => {
        let trangthai = tinhtrang?.value
        if (trangthai === null || trangthai === '') {
            iziToast.info({
                title: "Thiếu thông tin",
                position: "topRight",
            })
        }
        let change = await apiUpdateBook(id, hinh, ten, noidung, trangthai, gia, tiencoc)
        if (change && change.status === 200) {
            iziToast.success({
                title: "Sửa thành công",
                position: "topRight",
                message: change.message,
            })
        } else {
            iziToast.error({
                title: "Thất bại",
                position: "topRight",
                message: change.data.message,
            })
        }
    }
    const handleSaveData = () => {
        let res = apiUpdateChapter(id, title, content);
        if (res && res.status === 200) {
            iziToast.success({
                title: "Sửa thành công",
                position: 'topRight',
                message: res.data.message
            })
        }
    }
    const handleCloseChange = () => {
        setShowModal(false);
        setPreviewImage();
    }
    const handleCloseChange1 = () => {
        setShowModal1(false);
        setPreviewImage();
    }
    const handleCloseChange2 = () => {
        setShowModal2(false);
    }
    console.log(ten)
    return (
        <>
            <div className="w-10/12 mx-auto overflow-x-auto shadow-md">
                <h2 className="text-2xl font-bold mb-4">Sách đọc trực tuyến</h2>

                <table className="w-full bg-white border border-gray-300">
                    <thead>
                        <tr className='justify-around'>
                            <th className="py-2 px-4 border-b text-center" >Hình</th>
                            <th className="py-2 px-4 border-b text-center">Tên</th>
                            <th className="py-2 px-4 border-b text-center" >Duyệt</th>
                            <th className="py-2 px-4 border-b text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {book && book.length > 0 &&
                            book.map((item, index) => (
                                <tr key={index} className='shadow-sm'>
                                    <td className=" py-2 px-4 border-b">
                                        <img src={`https://thuesachadmin.onrender.com/img/${item.hinh}`}
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

                                    <td className="py-2 px-2 border-b">
                                        {item.trangthaiduyet === 'choduyet' ? <>Hãy chờ duyệt sách</> : <>
                                            <div>
                                                <Link to={`/post-chapter/${item.id}`}>
                                                    <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">Thêm Chương</button>
                                                </Link>

                                                <button className="bg-rose-500 text-white px-4 py-2 rounded mr-2 " onClick={() => handleEditInfo1(item.id)}>Sửa thông tin</button>
                                                <button className="bg-orange-500 text-white px-4 py-2 rounded mr-2" onClick={() => handleEditInfo2(item.id)}>Sửa chương</button>
                                            </div>
                                        </>}

                                    </td>

                                </tr>
                            ))

                        }

                        {/* Thêm các dòng khác tương tự cho từng sách */}
                    </tbody>
                </table>
            </div>
            {showModal1 ? (
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
                                                src={previewImage || `https://thuesachadmin.onrender.com/img/${detail.hinh}`}
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
                                                <label className="font-bold block">Tên sách:</label>
                                                <input
                                                    type="text"
                                                    className="border p-2 w-full"
                                                    value={ten}
                                                    onChange={(e) => setTen(e.target.value)}
                                                />

                                            </div>

                                        </div>

                                    </div>
                                    <div className=" flex items-center space-x-4">
                                        <div className="mt-4">
                                            <p>
                                                <span className="font-bold">Nội dung:</span>
                                                <input
                                                    type="text"
                                                    id="author"
                                                    className="border p-2 w-full"
                                                    value={noidung}
                                                    onChange={(e) => setEditedContent(e.target.value)}
                                                />
                                            </p>

                                        </div>
                                        <div className="mt-4">
                                            <label htmlFor="bookStatus" className="font-bold block">Trạng thái sách:</label>
                                            <Select
                                                id="bookStatus"
                                                options={options}
                                                onChange={(selectedOption) => handleChangeTinhTrang(selectedOption)}

                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleCloseChange1}
                                    >
                                        Đóng
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => handleSaveChange(detail.id)}
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
            {showModal2 ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-3/5 my-6 mx-auto">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold w-96">Sửa chương sách</h3>
                                </div>
                                <div className="relative w-full p-6 flex-auto mx-auto">

                                    <Select
                                        placeholder="Chọn chương"
                                        options={array}
                                        onChange={(selectedOption) => {
                                            console.log('Selected Option:', selectedOption);
                                            handleChangeCate(selectedOption);
                                        }}
                                    />
                                    <div className="max-w-2xl mx-auto mt-8"> {/* Adjusted max-w-2xl */}
                                        {chapterData && (<div><div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                                Tiêu đề
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                            <div className="mb-4 w-full">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                                                    Nội dung
                                                </label>
                                                <textarea
                                                    id="content"
                                                    name="content"
                                                    value={content || ''}  // Sử dụng giá trị mặc định là chuỗi trống nếu chapterData.noidung không tồn tại
                                                    placeholder="Nội dung sẽ xuất hiện ở đây"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-96 resize-none"
                                                    onChange={(e) => setContent(e.target.value)}  // Đảm bảo bạn đã đặt sự kiện onChange để cập nhật giá trị khi người dùng nhập liệu
                                                />


                                            </div></div>)}



                                    </div>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleCloseChange2}
                                    >
                                        Đóng
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => handleSaveData(detail.id)}
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
                                        <img src={`https://thuesachadmin.onrender.com/img/${item.hinh}`}
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
                                                src={previewImage || `https://thuesachadmin.onrender.com/img/${detail.hinh}`}
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
                                                <label className="font-bold block">Tên sách:</label>
                                                <input
                                                    type="text"
                                                    className="border p-2 w-full"
                                                    value={ten}
                                                    onChange={(e) => setTen(e.target.value)}
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
                                                    value={noidung}
                                                    onChange={(e) => setEditedContent(e.target.value)}
                                                />
                                            </p>
                                            <p>
                                                <span className="font-bold">Giá:</span>
                                                <input
                                                    type="number"
                                                    className="border p-2 w-full"
                                                    value={gia}
                                                    onChange={(e) => setEditedPrice(e.target.value)}
                                                />
                                            </p>
                                            <p>
                                                <span className="font-bold">Giá cọc:</span>
                                                <input
                                                    type="number"
                                                    id="deposit"
                                                    className="border p-2 w-full"
                                                    value={tiencoc}
                                                    onChange={(e) => setEditedDeposit(e.target.value)}
                                                />
                                            </p>
                                        </div>
                                        <div className="mt-4">
                                            <label htmlFor="bookStatus" className="font-bold block">Trạng thái sách:</label>
                                            <Select
                                                id="bookStatus"
                                                options={options}
                                                onChange={(selectedOption) => handleChangeTinhTrang(selectedOption)}

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
                                        onClick={() => handleSaveChange(detail.id)}
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
