import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-white rounded-lg shadow m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div href="#" className="flex items-center mb-4 sm:mb-0">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap  text-black">Thuê sách</span>
                    </div>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
                        <li>
                            <div href="#" className="mr-4 hover:underline md:mr-6 ">Thông tin về chúng tôi</div>
                        </li>
                        <li>
                            <div href="#" className="mr-4 hover:underline md:mr-6">Điều khoản & bảo mật</div>
                        </li>
                        <li>
                            <div href="#" className="mr-4 hover:underline md:mr-6 ">Giấy phép</div>
                        </li>
                        <li>
                            <div href="#" className="hover:underline">Liên hệ</div>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 sm:mx-auto  border-gray-700 lg:my-8 " />
                <span className=" text-sm text-gray-500 sm:text-center  flex justify-center">Thuê sách © 2023 <div className="hover:underline"> &nbsp;Design by &nbsp;</div> Lê Nguyễn Tất Thắng - Vũ Tuấn Nghĩa</span>
            </div>
        </footer>
    )
}
