import React from 'react'

export default function Footer() {
    return (

        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="#" className="flex items-center mb-4 sm:mb-0">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Thuê sách</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6 ">Thông tin về chúng tôi</a>
                        </li>
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6">Điều khoản & bảo mật</a>
                        </li>
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6 ">Giấy phép</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Liên hệ</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">Thuê sách</a>. Lê Nguyễn Tất Thắng - Vũ Tuấn Nghĩa</span>
            </div>
        </footer>


    )
}
