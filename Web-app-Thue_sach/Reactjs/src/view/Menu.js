import React from "react";
import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cart from './Cart';
import StaggeredDropDown from "../components/StaggeredDropdown";
import { Outlet } from 'react-router-dom';

export default function Menu() {
    const userData = useSelector((state) => state.user);

    return (
        < >
            <div className="pt-[92px] ">
                <Navbar fluid rounded className="bg-zinc-300 text-black bg-opacity-70 fixed top-0 z-50 flex-1 w-full">
                    <Navbar.Brand as={Link} className=" w-3/5">
                        <Link to="/">
                            <span className="self-center  text-xl font-semibold dark:text-white">
                                THUÊ SÁCH ONLINE
                            </span>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Collapse className="w-2/5">
                        <Link to="/"><div className="flex p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">

                            <svg className="flex-shrink-0 w-5 h-5 transition duration-75  text-gray-400  group-hover:text-white" fill="none" viewBox="0 0 23 23" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap text-lg font-roboto">Trang chủ</span>

                        </div></Link>
                        <Link to="/products"> <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">

                            <svg className="flex-shrink-0 w-5 h-5 transition duration-75  text-gray-400 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 23 23">
                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap text-lg font-roboto">Tủ sách</span>

                        </div></Link>
                        <Link to="/blogs"> <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">

                            <svg className="w-5 h-5 text-gray-400 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 23">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 5h1v12a2 2 0 0 1-2 2m0 0a2 2 0 0 1-2-2V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v15a2 2 0 0 0 2 2h14ZM10 4h2m-2 3h2m-8 3h8m-8 3h8m-8 3h8M4 4h3v3H4V4Z" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap text-lg font-roboto">Bài viết</span>

                        </div></Link>
                        <Link to="/blogs"> <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">

                            <svg className="w-5 h-5 text-gray-400 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 23">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 5h1v12a2 2 0 0 1-2 2m0 0a2 2 0 0 1-2-2V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v15a2 2 0 0 0 2 2h14ZM10 4h2m-2 3h2m-8 3h8m-8 3h8m-8 3h8M4 4h3v3H4V4Z" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap text-lg font-roboto">Liên hệ</span>

                        </div></Link>

                        <>
                            {userData.isLogin === true ? (
                                <>
                                    <div className='col-2 flex items-center'>
                                        <StaggeredDropDown userName={userData.userInfo.ten} />
                                        <Cart />

                                    </div>


                                </>
                            ) : (
                                <>
                                    <Link to="/signin">
                                        <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">
                                            <svg
                                                className="flex-shrink-0 w-5 h-5  transition duration-75  text-gray-400 group-hover:text-white"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 23 23"
                                                stroke-width="2"
                                                stroke="currentColor"
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                                                />
                                            </svg>
                                            <span className="flex-1 ml-3 whitespace-nowrap">
                                                Đăng nhập
                                            </span>
                                        </div>
                                    </Link>
                                    <Link to="/signup"><div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">
                                        <svg className="flex-shrink-0 w-5 h-5  transition duration-75  text-gray-400 group-hover:text-white" width="24" height="24" viewBox="0 0 23 23" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                            <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                            <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                        </svg>

                                        <span className="flex-1 ml-3 whitespace-nowrap">Đăng ký </span>
                                    </div></Link>
                                </>)
                            }
                        </>

                    </Navbar.Collapse>
                </Navbar>
            </div>
            <Outlet />
        </>
    );
}
