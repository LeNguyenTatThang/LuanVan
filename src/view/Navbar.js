import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT } from '../app/userReducer';
export default function Navbar() {
    const userData = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const handleLogout = async () => {

        await dispatch(LOG_OUT())
    }
    return (
        <>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 ">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <div className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100    group">
                                <Link to="/"><span className="ml-3">THUÊ SÁCH ONLINE</span></Link>
                            </div>
                        </li>
                        <li>
                            <Link to="/"><div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">

                                <svg className="flex-shrink-0 w-5 h-5 transition duration-75  text-gray-400  group-hover:text-white" fill="none" viewBox="0 0 23 23" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Trang chủ</span>

                            </div></Link>
                        </li>
                        <li>
                            <Link to="/products"> <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">

                                <svg className="flex-shrink-0 w-5 h-5 transition duration-75  text-gray-400 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 23 23">
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Sản phẩm</span>

                            </div></Link>
                        </li>
                        <li>
                            <Link to="/search"><div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">
                                <svg className="flex-shrink-0 w-5 h-5 transition duration-75  text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 23 23" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Tìm kiếm</span>
                            </div></Link>
                        </li>
                        <li>
                            <Link to="/chats"><div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">
                                <svg className="flex-shrink-0 w-5 h-5  transition duration-75  text-gray-400 group-hover:text-white" width="24" height="24" viewBox="0 0 23 23" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />  <path d="M12 20l-3 -3h-2a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-2l-3 3" />  <line x1="8" y1="9" x2="16" y2="9" />  <line x1="8" y1="13" x2="14" y2="13" /></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Chat</span>
                            </div></Link>
                        </li>
                        <li>
                            <>
                                {userData.isLogin === true ? <>

                                    <div className="dropdown dropdown-hover">
                                        <label tabindex="0" className='cursor-pointer' >
                                            <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">
                                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 " fill="none" viewBox="0 0 23 23" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <span className="flex-1 ml-3 whitespace-nowrap">{userData.userInfo.email} </span>
                                            </div>
                                        </label>
                                        <ul tabindex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><Link to='/add-book'>
                                                <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group cursor-pointer">
                                                    <svg className="w-5 h-5 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"></path>
                                                    </svg>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Thêm sách mới </span>
                                                </div></Link></li>
                                            <li><Link to='/profiles'>
                                                <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group cursor-pointer">
                                                    <svg className="w-5 h-5 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"></path>
                                                    </svg>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Cài đặt tài khoản </span>
                                                </div></Link></li>
                                            <li>
                                                <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group cursor-pointer">
                                                    <svg className="w-5 h-5 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"></path>
                                                    </svg>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">xem </span>
                                                </div></li>
                                            <li>
                                                <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group cursor-pointer">
                                                    <svg className="w-5 h-5 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"></path>
                                                    </svg>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Ho tro </span>
                                                </div></li>
                                            <li><div onClick={() => handleLogout()}>
                                                <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group cursor-pointer">
                                                    <svg className="w-5 h-5 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"></path>
                                                    </svg>
                                                    {/* {user ? <> <span className="flex-1 ml-3 whitespace-nowrap">{user?.name}</span></> : <>  <span className="flex-1 ml-3 whitespace-nowrap">Tài khoản </span></>} */}
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Logout </span>
                                                </div>
                                            </div>
                                            </li>
                                        </ul>
                                    </div>

                                </> : <>
                                    <Link to="/signin"><div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">
                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 " fill="none" viewBox="0 0 23 23" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {/* {user ? <> <span className="flex-1 ml-3 whitespace-nowrap">{user?.name}</span></> : <>  <span className="flex-1 ml-3 whitespace-nowrap">Tài khoản </span></>} */}
                                        <span className="flex-1 ml-3 whitespace-nowrap">Tài khoản </span>
                                    </div></Link>
                                </>
                                }
                            </>

                        </li>

                    </ul>
                </div>
            </aside >
        </>
    )
}
