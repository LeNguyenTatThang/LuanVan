import React from 'react';
import iziToast from 'izitoast'; // Import iziToast hoặc module thông báo khác nếu cần
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOG_OUT } from '../app/userReducer';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        // Xử lý đăng xuất ở đây
        // Ví dụ: Gọi API hoặc cập nhật trạng thái đăng nhập

        // Hiển thị thông báo đăng xuất thành công
        iziToast.success({
            title: 'Đăng xuất thành công',
            position: 'bottomRight',

        });
        // Cuộn lên đầu trang trước khi reload (nếu cần)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/');
        dispatch(LOG_OUT());
    };

    return (
        <div
            onClick={handleLogout}
            className="text-base font-sans mx-auto cursor-pointer text-blue-500 hover:text-blue-700 h-8"
        >
            Đăng xuất
        </div>
    );
};

export default Logout;
