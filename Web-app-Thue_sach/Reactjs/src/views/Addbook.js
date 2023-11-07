import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
export default function Addbook() {
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

        // console.log('e')
        setBook(e.target.value);
        // console.log(e)
    }
    const handleRead1 = async (e) => {
        let value = e.target.value
        let formData = { loai: value }
        console.log(formData)
        setBook(formData)
        // setBook(value);
    }
    function submitForm(e) {
        console.log(e)
    }
    useEffect(() => {
        console.log(book.loai)
    }, [book])
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
                    <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Thêm sách mới
                    </div>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => submitForm(e)}>
                                {JSON.stringify(book.loai)}
                                <select onChange={(e) => handleRead1(e)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option  >chon</option>
                                    <option value={0} >Sách đọc miễn phí</option>
                                    <option value={1}>Sách cho thuê</option>
                                </select>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sách</label>
                                    <input type="text" name="tensach" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <select onChange={(e) => handleRead(e)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={0} >Thể loại 1</option>
                                    <option value={1}>Thể loại 2</option>
                                </select>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình ảnh</label>
                                    <input type="file" className="file-input w-full max-w-xs" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá tiền</label>
                                    <input type="number" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiền cọc</label>
                                    <input type="number" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên tác giả</label>
                                    <input type="text" name="confirm-password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label for="terms" className="font-light text-gray-500 dark:text-gray-300">Tôi đồng ý <div className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">điều khoản và chính sách</div></label>
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Tạo tài khoản</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Bạn đã có tài khoản?<Link to='/login'> <div className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng nhập tại đây</div></Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
