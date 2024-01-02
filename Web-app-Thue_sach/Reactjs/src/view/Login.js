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
                position: 'bottomRight',
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
        } else {
            iziToast.warning({
                title: 'Lỗi',
                position: 'topRight',
                message: res.message
            });
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
