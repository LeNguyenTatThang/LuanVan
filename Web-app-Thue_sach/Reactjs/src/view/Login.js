import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import iziToast from 'izitoast';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_SUCCESS } from '../app/userReducer';
import { loginApi } from '../Service/UserService';
export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [matkhau, setmatkhau] = useState();

    const userData = useSelector((state) => state.user);

    useEffect(() => {
        if (userData.isLogin) {
            navigate('/');
        }
    }, [userData])

    const dispatch = useDispatch();
    const handleLogin = async () => {
        if (!email || !matkhau) {
            iziToast.error({
                title: 'Cảnh báo',
                position: 'topRight',
                message: 'Không được để trống'
            });
            return;
        }
        let res = await loginApi(email, matkhau);
        console.log(res)
        if (res && res.errcode === 0) {
            dispatch(LOGIN_SUCCESS(res.user))
            iziToast.success({
                title: 'Hi',
                position: 'topRight',
                message: 'Chào mừng bạn đến với Thuê Sách'
            });
            navigate('/', { replace: true });
        }

    }
    return (
        <>
            <div className="bg-gray-50  ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
                    <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900   ">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        THUÊ SÁCH
                    </div>
                    <div className="w-full bg-white rounded-lg shadow  border md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl   ">
                                Đăng nhập tài khoản của bạn
                            </h1>
                            <div className='flex'>
                                <button
                                    className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
                                        viewBox="-0.5 0 48 48" version="1.1">

                                        <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                                <g id="Google" transform="translate(401.000000, 860.000000)">
                                                    <path
                                                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                                        id="Fill-1" fill="#FBBC05"> </path>
                                                    <path
                                                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                                        id="Fill-2" fill="#EB4335"> </path>
                                                    <path
                                                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                                        id="Fill-3" fill="#34A853"> </path>
                                                    <path
                                                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                                        id="Fill-4" fill="#4285F4"> </path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    <span>Continue with Google</span>
                                </button>
                                <button
                                    className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 48 48" version="1.1">
                                        <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g id="Color-" transform="translate(-200.000000, -160.000000)" fill="#4460A0">
                                                <path
                                                    d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
                                                    id="Facebook">

                                                </path>
                                            </g>
                                        </g>
                                    </svg>

                                    <span>Continue with Facebook</span>
                                </button>
                            </div>
                            <div
                                className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p
                                    className="mx-4 mb-0 text-center font-semibold   ">
                                    Or
                                </p>
                            </div>

                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900   ">Email của bạn</label>
                                    <input type="text" className="bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   border-gray-600  placeholder-gray-400     focus:ring-blue-500  focus:border-blue-500"
                                        placeholder="thuesach@gmail.com"
                                        value={email}
                                        onChange={(event) => { setEmail(event.target.value) }}
                                    />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900   ">Mật khẩu</label>
                                    <input type="password"
                                        value={matkhau}
                                        onChange={(event) => { setmatkhau(event.target.value) }}
                                        placeholder="••••••••" className="bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    border-gray-600  placeholder-gray-400     focus:ring-blue-500  focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300    focus:ring-primary-600  ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label for="remember" className=" text-gray-300">Nhớ tài khoản</label>
                                        </div>
                                    </div>
                                    <div className="text-sm font-medium text-primary-600 hover:underline  text-primary-500">Quên mật khẩu?</div>
                                </div>
                                <button className="w-full text-black text-xl bg-teal-100 hover:bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center"
                                    onClick={() => handleLogin()}>
                                    Đăng nhập</button>
                                <p className="text-sm font-light  text-gray-400">
                                    Bạn chưa có tài khoản? <Link to="/signup"><div className="font-medium text-primary-600 hover:underline  text-primary-500">Đăng ký tài khoản</div></Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
