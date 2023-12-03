import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRegister } from '../Service/UserService';
import iziToast from 'izitoast';

export default function Register() {
    const [email, setEmail] = useState();
    const [matkhau, setmatkhau] = useState();
    const [ten, setTen] = useState();
    const navigate = useNavigate()
    const [confirmPassword, setConfirmPasswrod] = useState();
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleCheckboxChange = () => {
        setAgreedToTerms(!agreedToTerms);
    };
    const handleRegister = async () => {
        if (agreedToTerms) {
            if (!ten || !email || !matkhau || !confirmPassword) {
                iziToast.error({
                    title: 'Lỗi!!',
                    position: 'topRight',
                    message: 'Bạn không được để trống'
                });
            }
            if (matkhau !== confirmPassword) {
                iziToast.error({
                    title: 'Lỗi!!',
                    position: 'topRight',
                    message: 'Mật khẩu không trùng khớp'
                });
            }
            let res = await apiRegister(ten, email, matkhau);

            if (res && res.status === 200) {
                iziToast.success({
                    title: 'Hi',
                    position: 'topRight',
                    message: 'Đăng ký thành công, vui lòng xác nhận email'
                });
                setTimeout(navigate('/signin'), 2000);
            } else {
                iziToast.warning({
                    title: 'Lỗi',
                    position: 'center',
                    message: res.data.message,
                });
            }
        } else {
            iziToast.error({
                title: 'Lỗi!!',
                position: 'topRight',
                message: 'Bạn có đồng ý với điều khoản, chính sách của chúng tôi'
            });
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
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Tên</label>
                                    <input type="text" name="ten" placeholder="Thuê sách" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
                                    <input type="password" name="confirmPassword" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required=""
                                        value={confirmPassword}
                                        onChange={(event) => { setConfirmPasswrod(event.target.value) }} />
                                </div>
                                <div className="ml-3 text-sm flex">
                                    <label htmlFor="terms" className="font-light text-gray-500 flex">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={agreedToTerms}
                                            onChange={handleCheckboxChange}
                                            className="mr-2"
                                        />
                                        Tôi đồng ý &nbsp;
                                        <div className="font-medium text-primary-600 hover:underline" href="#">
                                            điều khoản và chính sách
                                        </div>
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    className="w-full text-black bg-stone-200 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
                                    onClick={handleRegister}
                                    disabled={!agreedToTerms}
                                >
                                    Tạo tài khoản
                                </button>
                                <p className="text-sm font-light text-gray-500">
                                    Bạn đã có tài khoản?
                                    <Link to="/login">
                                        <div className="font-medium text-primary-600 hover:underline">Đăng nhập tại đây</div>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
