import React from 'react'

export default function Product() {
    return (
        <>
            <div className="flex gap-4">

                <button id="dropdownDefault" data-dropdown-toggle="dropdown"
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    type="button">
                    Bộ lọc
                    <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <button id="dropdownDefault" data-dropdown-toggle="dropdown"
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    type="button">
                    Bộ lọc
                    <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <button id="dropdownDefault" data-dropdown-toggle="dropdown"
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    type="button">
                    Bộ lọc
                    <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
            </div>
            <br />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

                <div className="rounded overflow-hidden shadow-lg flex flex-col">

                    <div className="relative">
                        <img className="w-full"
                            src="https://simg.zalopay.com.vn/zlp-website/assets/Sach_dam_nghi_lon_6505f38ece.jpg?v=1536810083057?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                            alt="Sunset in the mountains" />
                        <div
                            className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                        </div>


                        <div
                            className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                            Thuê
                        </div>

                    </div>
                    <div className="px-6 py-4 mb-auto">
                        <div
                            className="font-medium text-lg  hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                            Dám nghĩ lớn</div>
                        <p className="text-gray-500 text-sm">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                    <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                            <svg height="13px" width="13px" version="1.1" id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg" x="0px"
                                y="0px" viewBox="0 0 512 512">
                                <g>
                                    <g>
                                        <path
                                            d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                            <span className="ml-1">6 mins ago</span>
                        </span>

                        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                            <svg className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                                </path>
                            </svg>
                            <span className="ml-1">39 Comments</span>
                        </span>
                    </div>
                </div>


                <div className="rounded overflow-hidden shadow-lg flex flex-col">

                    <div className="relative">
                        <img className="w-full"
                            src="https://simg.zalopay.com.vn/zlp-website/assets/sach_hay_nhat_nen_doc_hat_giong_tam_hon_9187a42c48.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                            alt="Sunset in the mountains" />
                        <div
                            className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                        </div>

                        <div
                            className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                            Thuê
                        </div>

                    </div>
                    <div className="px-6 py-4 mb-auto">
                        <div
                            className="font-medium text-lg  hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                            Hạt giống tâm hồn</div>
                        <p className="text-gray-500 text-sm">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                    <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                            <svg height="13px" width="13px" version="1.1" id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg" x="0px"
                                y="0px" viewBox="0 0 512 512" >
                                <g>
                                    <g>
                                        <path
                                            d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                            <span className="ml-1"> 10 days ago</span>
                        </span>

                        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                            <svg className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                                </path>
                            </svg>
                            <span className="ml-1">0 Comments</span>
                        </span>
                    </div>
                </div>


                <div className="rounded overflow-hidden shadow-lg flex flex-col">

                    <div className="relative">
                        <img className="w-full"
                            src="https://simg.zalopay.com.vn/zlp-website/assets/sach_hay_nhat_nen_doc_hanh_trinh_ve_phuong_dong_b9d61fdb08.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                            alt="Sunset in the mountains" />
                        <div
                            className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                        </div>

                        <div
                            className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                            Thuê
                        </div>

                    </div>
                    <div className="px-6 py-4 mb-auto">
                        <div
                            className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                            Hành trình về phương Đông
                        </div>
                        <p className="text-gray-500 text-sm">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                    <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                            <svg height="13px" width="13px" version="1.1" id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg" x="0px"
                                y="0px" viewBox="0 0 512 512">
                                <g>
                                    <g>
                                        <path
                                            d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                            <span className="ml-1">16 hours ago</span>
                        </span>

                        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                            <svg className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                                </path>
                            </svg>
                            <span className="ml-1">9 Comments</span>
                        </span>
                    </div>
                </div>

                <br />

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                <div className="rounded overflow-hidden shadow-lg flex flex-col">

                    <div className="relative">
                        <img className="w-full"
                            src="https://simg.zalopay.com.vn/zlp-website/assets/Sach_dam_nghi_lon_6505f38ece.jpg?v=1536810083057?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                            alt="Sunset in the mountains" />
                        <div
                            className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                        </div>

                        <div
                            className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                            Đọc
                        </div>

                    </div>
                    <div className="px-6 py-4 mb-auto">
                        <div
                            className="font-medium text-lg  hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                            Dám nghĩ lớn</div>
                        <p className="text-gray-500 text-sm">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                    <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                            <svg height="13px" width="13px" version="1.1" id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg" x="0px"
                                y="0px" viewBox="0 0 512 512">
                                <g>
                                    <g>
                                        <path
                                            d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                            <span className="ml-1">6 mins ago</span>
                        </span>

                        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                            <svg className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                                </path>
                            </svg>
                            <span className="ml-1">39 Comments</span>
                        </span>
                    </div>
                </div>


                <div className="rounded overflow-hidden shadow-lg flex flex-col">

                    <div className="relative">
                        <img className="w-full"
                            src="https://simg.zalopay.com.vn/zlp-website/assets/sach_hay_nhat_nen_doc_hat_giong_tam_hon_9187a42c48.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                            alt="Sunset in the mountains" />
                        <div
                            className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                        </div>

                        <div
                            className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                            Đọc
                        </div>

                    </div>
                    <div className="px-6 py-4 mb-auto">
                        <div
                            className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                            Hạt giống tâm hồn</div>
                        <p className="text-gray-500 text-sm">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                    <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                            <svg height="13px" width="13px" version="1.1" id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg" x="0px"
                                y="0px" viewBox="0 0 512 512" >
                                <g>
                                    <g>
                                        <path
                                            d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                            <span className="ml-1"> 10 days ago</span>
                        </span>

                        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                            <svg className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                                </path>
                            </svg>
                            <span className="ml-1">0 Comments</span>
                        </span>
                    </div>
                </div>

                <div className="rounded overflow-hidden shadow-lg flex flex-col">

                    <div className="relative">
                        <img className="w-full"
                            src="https://simg.zalopay.com.vn/zlp-website/assets/sach_hay_nhat_nen_doc_hanh_trinh_ve_phuong_dong_b9d61fdb08.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                            alt="Sunset in the mountains" />
                        <div
                            className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                        </div>

                        <div
                            className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                            Đọc
                        </div>

                    </div>
                    <div className="px-6 py-4 mb-auto">
                        <div
                            className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                            Hành trình về phương Đông
                        </div>
                        <p className="text-gray-500 text-sm">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                    <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                            <svg height="13px" width="13px" version="1.1" id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg" x="0px"
                                y="0px" viewBox="0 0 512 512">
                                <g>
                                    <g>
                                        <path
                                            d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                            <span className="ml-1">16 hours ago</span>
                        </span>

                        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                            <svg className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                                </path>
                            </svg>
                            <span className="ml-1">9 Comments</span>
                        </span>
                    </div>
                </div>


            </div>
        </>
    )
}
