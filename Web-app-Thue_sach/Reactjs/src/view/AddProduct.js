import iziToast from 'izitoast';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

export default function AddProduct() {

    const navigate = useNavigate();
    const [book, setBook] = useState(
        {
            loai: "",
        }
    );
    // const [catetory, setcateRoty] = useState([
    //     {
    //         label: 'Sách đọc miễn phí',
    //         value: 1
    //     },
    //     {
    //         label: 'Sách cho thuê',
    //         value: 2
    //     }
    // ])
    const handleRead = (e) => {
        setBook(e.target.value);
    }
    const handleRead1 = async (e) => {
        let value = e.target.value
        let formData = { loai: value }
        console.log(formData)
        setBook(formData)
    }

    function submitForm(e) {
        console.log(e)
    }

    const userData = useSelector((state) => state.user);

    useEffect(() => {
        if (!userData.isLogin) {
            navigate(-1);
        }
    }, [])

    const dispatch = useDispatch();

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
                                    <input type="text" name="tensach" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                                </div>
                                <select onChange={(e) => handleRead1(e)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder='thuesach@gmail.com' ">
                                    <option  >Chon loai sach</option>
                                    <option value={0} >Sách đọc miễn phí</option>
                                    <option value={1}>Sách cho thuê</option>
                                </select>

                                <select onChange={(e) => handleRead(e)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ">
                                    <option value={0} >Thể loại 1</option>
                                    <option value={1}>Thể loại 2</option>
                                </select>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Hình ảnh</label>
                                    <input type="file" className="file-input w-full max-w-xs" />
                                </div>

                                {book.loai === '1' ?
                                    <>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Giá tiền</label>
                                            <input type="number" name="giatien" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Tiền cọc</label>
                                            <input type="number" name="tiencoc" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Tên tác giả</label>
                                            <input type="text" name="tentacgia" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                                        </div>

                                    </>
                                    :
                                    <>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Tên tác giả</label>
                                            <input type="text" name="tentacgia" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                                        </div>
                                    </>
                                }
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label for="terms" className="font-light text-gray-500 ">Tôi đồng ý <div className="font-medium text-primary-600 hover:underline " href="#">điều khoản và chính sách</div></label>
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-black bg-slate-600 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center">Send</button>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
