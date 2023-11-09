import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { apiRegister } from '../Service/UserService';

export default function Register() {
    const [email, setEmail] = useState();
    const [matkhau, setmatkhau] = useState();
    const [ten, setTen] = useState();
    const navigate = useNavigate()
    const [confirmPassword, setConfirmPasswrod] = useState();
    const handleRegister = async () => {
        console.log(ten, email, matkhau)
        if (!ten || !email || !matkhau || !confirmPassword) {
            alert("Khong duoc de trong");
        }
        if (matkhau !== confirmPassword) {
            alert('mat khau khong tung khop')
        }
        let res = await apiRegister(ten, email, matkhau);
        console.log(res)
        if (res && res.errcode === 0) {
            // alert('Dang ky thanh cong, ve trang login')
            console.log(navigate)
            navigate('/signin');
        }
    }
    return (
        <>

            <section className="bg-gray-50 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
                    <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Thuê sách Online
                    </div>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Tạo tài khoản
                            </h1>
                            <div className="space-y-4 md:space-y-6" >
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email của bạn</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="thuesach@gmail.com"
                                        required=""
                                        value={email}
                                        onChange={(event) => { setEmail(event.target.value) }}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Ten</label>
                                    <input type="text" name="ten" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        required=""
                                        value={ten}
                                        onChange={(event) => { setTen(event.target.value) }} />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Mật khẩu</label>
                                    <input type="password" name="matkhau" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        required=""
                                        value={matkhau}
                                        onChange={(event) => { setmatkhau(event.target.value) }} />
                                </div>
                                <div>
                                    <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 ">Nhập lại mật khẩu</label>
                                    <input type="confirm-password" name="confirmPassword" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required=""
                                        value={confirmPassword}
                                        onChange={(event) => { setConfirmPasswrod(event.target.value) }} />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required="" />
                                    </div>
                                    <div className="ml-3 text-sm flex">
                                        <label for="terms" className="font-light text-gray-500 flex ">Tôi đồng ý &nbsp;<div className="font-medium text-primary-600 hover:underline" href="#">điều khoản và chính sách</div></label>
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-black bg-stone-200 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center "
                                    onClick={() => handleRegister()}
                                >Tạo tài khoản</button>
                                <p className="text-sm font-light text-gray-500 ">
                                    Bạn đã có tài khoản?<Link to='/login'> <div className="font-medium text-primary-600 hover:underline ">Đăng nhập tại đây</div></Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
