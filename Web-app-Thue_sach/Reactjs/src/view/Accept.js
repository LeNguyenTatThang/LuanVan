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
        <div className="registration-success">
            <h2>Đăng ký thành công!</h2>
            <p>
                Tài khoản của bạn đã được tạo thành công. Bạn có thể đăng nhập ngay bây giờ.
            </p>
            <strong>Đăng nhập  <Link to='/signin'>tại đây</Link></strong>
        </div>
    );
};

export default RegistrationSuccess;
