import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cart from './Cart';
import StaggeredDropDown from "../components/StaggeredDropdown";
import { Outlet } from 'react-router-dom';

export default function Menu() {
    const userData = useSelector((state) => state.user);

    return (
        < >
            <div className="pt-24">
                <nav className="bg-zinc-300 text-black bg-opacity-70 fixed top-0 z-50 w-full flex flex-row justify-between items-center p-4">
                    <div className="ml-4">
                        <Link to="/">
                            <span className="text-xl font-semibold dark:text-white">
                                THUÊ SÁCH ONLINE
                            </span>
                        </Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/" className="nav-link">
                            Trang chủ
                        </Link>
                        <Link to="/products" className="nav-link">
                            Tủ sách
                        </Link>
                        <Link to="/blogs" className="nav-link">
                            Bài viết
                        </Link>
                        <Link to="/contact" className="nav-link">
                            Liên hệ
                        </Link>
                        {userData.isLogin ? (
                            <div className="col-2 flex items-center">
                                <StaggeredDropDown userName={userData.userInfo.ten} />
                                <Cart />
                            </div>
                        ) : (
                            <Link to="/signin" className="nav-link">
                                <div className="flex items-center">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 duration-75 text-gray-400 group-hover:text-white"
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
                                    <span className="ml-3 whitespace-nowrap font-sans">
                                        Đăng nhập
                                    </span>
                                </div>
                            </Link>
                        )}
                    </div>
                </nav>
            </div>

            <Outlet />
        </>
    );
}
