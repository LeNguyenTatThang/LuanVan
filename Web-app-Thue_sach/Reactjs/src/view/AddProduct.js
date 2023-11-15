import iziToast from 'izitoast';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { addBook, apiListCate } from '../Service/UserService';
import Select from 'react-select';
export default function AddProduct() {

    const navigate = useNavigate();

    const [book, setBook] = useState(
        {
            loai: "",
        }
    );

    const handleRead = (e) => {
        setBook(e.target.value);
    }

    const handleRead1 = async (e) => {
        let value = e.target.value
        let formData = { loai: value }
        setBook(formData)
    }


    const [ten, setTen] = useState();
    const [hinh, setHinh] = useState({ preview: '', data: '' });
    const [gia, setGia] = useState();
    const [tiencoc, setTiencoc] = useState();
    const [tentacgia, setTentacgia] = useState();
    const [theloai_id, setTheloai_id] = useState(1);
    const [id_users, setId_user] = useState()
    const userData = useSelector((state) => state.user);
    const [category, setCategory] = useState();
    useEffect(() => {
        if (!userData.isLogin) {
            navigate(-1);
        }
        if (userData.isLogin) {
            setId_user(userData.userInfo.id)
        }
        getCategory();

    }, [])

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setHinh(img)
    }

    const getCategory = async () => {
        let cate = await apiListCate();
        if (cate && cate.data && cate.status) {
            setCategory(cate.data)
        }
    }
    console.log("check cate>>>>", category)
    const handleSend = async (e) => {

        if (!ten || !hinh.data || !tentacgia) {
            iziToast.error({
                title: "Opzzz!!",
                position: "topRight",
                message: "Vui lòng không để trống"
            });
        }
        if (book.loai === '') {
            iziToast.info({
                title: "Opzzz!!",
                position: "topRight",
                message: "Hãy chọn loại sách đăng"
            });
        }
        let res = await addBook(hinh.data, ten, book.loai, theloai_id, gia, tiencoc, tentacgia, id_users);

        if (res && res.status === 200) {
            iziToast.success({
                title: "Succes",
                position: "topRight",
                message: res.message
            });
            navigate('/add-book');
        } else {
            if (res && res.status === 400)
                iziToast.error({
                    title: "Opzzz!!",
                    position: "topRight",
                    message: "Bị lỗi rồi"
                });
        }

    }

    const array = category?.map((res) => {
        return {
            label: res.ten,
            value: res.id
        }
    })

    const handleChangeCate = (e) => {
        console.log(e)
    }


    return (
        <div>
            <section className="bg-gray-50 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
                    <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Thêm sách mới
                    </div>
                    <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Tên sách</label>
                                    <input type="text" name="ten" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder='Nhập tên sách' required=""
                                        value={ten}
                                        onChange={(event) => { setTen(event.target.value) }} />
                                </div>
                                <select onChange={(e) => handleRead1(e)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder='thuesach@gmail.com' ">
                                    <option  >Chọn kiểu sách đăng</option>

                                    <option value={0}>Sách cho thuê</option>
                                    <option value={1} >Sách đọc miễn phí</option>
                                </select>

                                <Select
                                    placeholder="Chọn thể loại"
                                    options={array}

                                    onChange={(e) => {
                                        handleChangeCate(e)
                                    }}
                                />


                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Hình ảnh</label>
                                    <input type="file" name='hinh' className="file-input w-full max-w-xs"
                                        onChange={handleChange} />
                                    <img src={hinh.preview} />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Tên tác giả</label>
                                    <input type="text" name="tentacgia" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required=""
                                        value={tentacgia}
                                        onChange={(event) => { setTentacgia(event.target.value) }} />
                                </div>


                                {book.loai === '0' ?
                                    <>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Giá tiền</label>
                                            <input type="number" name="gia" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required=""
                                                value={gia}
                                                onChange={(event) => { setGia(event.target.value) }} />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Tiền cọc</label>
                                            <input type="number" name="tiencoc" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""
                                                value={tiencoc}
                                                onChange={(event) => { setTiencoc(event.target.value) }} />
                                        </div>


                                    </>
                                    :
                                    <>


                                    </>
                                }
                                <button type="submit" className="w-full text-black bg-slate-600 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
                                    onClick={() => handleSend()}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
