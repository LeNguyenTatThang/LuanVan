import React, { useEffect } from 'react';
import { callApiMail } from '../Service/UserService';
import { Link, useParams } from 'react-router-dom';
const RegistrationSuccess = () => {

    const { id } = useParams();
    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const data = await callApiMail(id);
                console.log(">>>token:", id)
            } catch (error) { }
        };
        verifyEmailUrl();
    }, [id]);
    return (
        <div className="bg-green-500 text-white p-6 rounded-md text-center">
            <h2 className="text-2xl font-bold mb-4">Đăng ký thành công!</h2>
            <p className="text-lg mb-6">
                Tài khoản của bạn đã được tạo thành công. Bạn có thể đăng nhập ngay bây giờ.
            </p>
            <strong className="block text-xl">
                Đăng nhập <Link to="/signin" className="underline">tại đây</Link>
            </strong>
        </div>

    );
};

export default RegistrationSuccess;
