import React from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT } from '../app/userReducer';
import iziToast from 'izitoast';
import Cart from './Cart';
export default function Navbar() {
    const userData = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        navigate('/')
        iziToast.success({
            position: 'topRight',
            message: 'Bạn đã đăng xuất'
        });
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
                            <Link to="/blogs"> <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">

                                <svg className="w-5 h-5 text-gray-400 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 23">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 5h1v12a2 2 0 0 1-2 2m0 0a2 2 0 0 1-2-2V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v15a2 2 0 0 0 2 2h14ZM10 4h2m-2 3h2m-8 3h8m-8 3h8m-8 3h8M4 4h3v3H4V4Z" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Bài viết</span>

                            </div></Link>
                        </li>

                        <li>
                            <Link to="/chat"><div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">
                                <svg className="flex-shrink-0 w-5 h-5  transition duration-75  text-gray-400 group-hover:text-white" width="24" height="24" viewBox="0 0 23 23" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />  <path d="M12 20l-3 -3h-2a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-2l-3 3" />  <line x1="8" y1="9" x2="16" y2="9" />  <line x1="8" y1="13" x2="14" y2="13" /></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Chat</span>
                            </div></Link>
                        </li>
                        <li>
                            <>
                                {userData.isLogin === true ? <>

                                    <div className='flex col-2 justify-between items-center'>
                                        <div className="dropdown dropdown-hover ">
                                            <label tabindex="0" className='cursor-pointer w-40 text-clamp-1' >
                                                <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">
                                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 " fill="none" viewBox="0 0 23 23" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">{userData.userInfo && <span>{userData.userInfo.ten}</span>} </span>
                                                </div>
                                            </label>
                                            <ul tabindex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li><Link to='/add-book'>
                                                    <div className="flex items-center p-2 text-gray-900 rounded-lg">
                                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4"></path>
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Thêm sách mới </span>
                                                    </div></Link></li>
                                                <li><Link to='/profiles'>
                                                    <div className="flex items-center p-2  text-gray-900 rounded-lg group cursor-pointer">
                                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"></path>
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Xem tài khoản </span>
                                                    </div></Link></li>
                                                <li><Link to='/manager-book'>
                                                    <div className="flex items-center p-2 text-gray-900 rounded-lg">
                                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                                            <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z"></path>
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Quản lý phiếu thuê</span>
                                                    </div></Link></li>
                                                <li><Link to='/read-book'>
                                                    <div className="flex items-center p-2 text-gray-900 rounded-lg">
                                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                                            <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z"></path>
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Quản lý sách</span>
                                                    </div></Link></li>
                                                <li><Link to='/#'>
                                                    <div className="flex items-center p-2 text-gray-900 rounded-lg">
                                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                        </svg>

                                                        <span className="flex-1 ml-3 whitespace-nowrap">Hỗ trợ </span>
                                                    </div></Link></li>

                                                <li><div onClick={() => handleLogout()}>
                                                    <div className="flex items-center p-2 text-gray-900 rounded-lg">
                                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"></path>
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Đăng xuất </span>
                                                    </div>
                                                </div>
                                                </li>
                                            </ul>

                                        </div>

                                        <Cart />

                                    </div>

                                </> : <>
                                    <Link to="/signin"><div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">
                                        <svg className="flex-shrink-0 w-5 h-5  transition duration-75  text-gray-400 group-hover:text-white" width="24" height="24" viewBox="0 0 23 23" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                        </svg>

                                        <span className="flex-1 ml-3 whitespace-nowrap">Đăng nhập </span>
                                    </div></Link>
                                    <Link to="/signup"><div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">
                                        <svg className="flex-shrink-0 w-5 h-5  transition duration-75  text-gray-400 group-hover:text-white" width="24" height="24" viewBox="0 0 23 23" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                            <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                            <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                        </svg>

                                        <span className="flex-1 ml-3 whitespace-nowrap">Đăng ký </span>
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
