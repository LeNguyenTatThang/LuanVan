import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UPDATE_USER_INFORMATION } from '../app/userReducer';
import { updateUser } from '../Service/UserService';
import iziToast from 'izitoast';

export default function Profile() {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [newUserInfo, setNewUserInfo] = useState({
        ten: userData.userInfo ? userData.userInfo.ten : '',
        diachi: userData.userInfo ? userData.userInfo.diachi : '',
        sdt: userData.userInfo ? userData.userInfo.sdt : '',
        hinh: userData.userInfo ? userData.userInfo.hinh : '',
    });
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (!userData.isLogin && !editMode) {
            navigate('/');
        }
    }, [userData, navigate, editMode]);

    const handleEditProfile = () => {
        setEditMode(true);
    };

    const handleChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setSelectedImage(img);
    };

    const handleSaveChanges = async () => {
        if (editMode && selectedImage) {
            // Update user information and exit edit mode
            await updateUser(
                userData.userInfo.id,
                selectedImage.data,
                newUserInfo.ten,
                newUserInfo.diachi,
                newUserInfo.sdt
            );
            // After successfully saving changes
            dispatch(UPDATE_USER_INFORMATION(newUserInfo));
            setEditMode(false);
        }
    };

    const handleGoBack = () => {
        // Reset newUserInfo to the current user information and exit edit mode
        setNewUserInfo({
            ten: userData.userInfo ? userData.userInfo.ten : '',
            diachi: userData.userInfo ? userData.userInfo.diachi : '',
            sdt: userData.userInfo ? userData.userInfo.sdt : '',
            hinh: userData.userInfo ? userData.userInfo.hinh : '',
        });
        setEditMode(false);
    };
    const [hinh, setHinh] = useState({ preview: '', data: '' });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };
    return (
        <>
            <div className="h-screen bg-gray-200 pt-10">
                <div>
                    <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="border-b px-4 pb-6">
                            <div className="text-center my-4">
                                {editMode ? (
                                    <img
                                        className="h-32 w-32 rounded-full border-4 border-white mx-auto my-4"
                                        src={selectedImage ? selectedImage.preview : newUserInfo.hinh}
                                        alt="New Image"
                                    />
                                ) : (
                                    <img
                                        className="h-32 w-32 rounded-full border-4 border-white mx-auto my-4"
                                        src={`http://localhost:8000/img/${userData?.userInfo?.hinh}`}
                                        alt={userData?.userInfo?.hinh || 'Chưa cập nhật'}
                                    />
                                )}
                                <div className="py-2">
                                    <h3 className="font-bold text-2xl mb-1">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="ten"
                                                value={newUserInfo.ten}
                                                onChange={handleInputChange}
                                                className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-lg"
                                            />
                                        ) : (
                                            <>{userData.userInfo ? userData.userInfo.ten : ''}</>
                                        )}
                                    </h3>
                                    <div className="py-2">
                                        {/* Input fields for 'diachi', 'sdt', and 'hinh' */}
                                        {editMode ? (
                                            <>
                                                <input
                                                    type="text"
                                                    name="diachi"
                                                    value={newUserInfo.diachi}
                                                    onChange={handleInputChange}
                                                    placeholder="Địa chỉ"
                                                    className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-lg p-2"
                                                />
                                                <input
                                                    type="text"
                                                    name="sdt"
                                                    value={newUserInfo.sdt}
                                                    onChange={handleInputChange}
                                                    placeholder="Số điện thoại"
                                                    className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-lg p-2"
                                                />
                                                <input
                                                    type="file"
                                                    name="hinh"
                                                    className="file-input w-full max-w-xs"
                                                    onChange={handleChange}
                                                />
                                                <img src={hinh.preview} alt="Preview" />
                                            </>
                                        ) : (
                                            <>
                                                <div className="py-2">
                                                    {/* Information display for 'diachi', 'sdt', and 'hinh' */}
                                                    {!editMode && userData.userInfo ? (
                                                        <>
                                                            <div className="flex items-center mb-2">
                                                                <span className="mr-2 text-gray-700">Email:</span>
                                                                <span className="text-gray-800">
                                                                    {userData.userInfo.email || 'Chưa cập nhật'}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center mb-2">
                                                                <span className="mr-2 text-gray-700">Địa chỉ:</span>
                                                                <span className="text-gray-800">
                                                                    {userData.userInfo.diachi || 'Chưa cập nhật'}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center mb-2">
                                                                <span className="mr-2 text-gray-700">Số điện thoại:</span>
                                                                <span className="text-gray-800">
                                                                    {userData.userInfo.sdt || 'Chưa cập nhật'}
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : null}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 px-2">
                                {editMode ? (
                                    <>
                                        <button
                                            onClick={handleSaveChanges}
                                            className="flex-1 rounded-full bg-blue-600 text-white antialiased font-bold hover:bg-blue-800 px-4 py-2"
                                        >
                                            Lưu
                                        </button>
                                        <button
                                            onClick={handleGoBack}
                                            className="flex-1 rounded-full bg-gray-500 text-white antialiased font-bold hover:bg-gray-700 px-4 py-2"
                                        >
                                            Trở về
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleEditProfile}
                                        className="flex-1 rounded-full bg-blue-600 text-white antialiased font-bold hover:bg-blue-800 px-4 py-2"
                                    >
                                        Sửa thông tin
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="px-4 py-4">
                            <div className="flex gap-2 items-center text-gray-800r mb-4">
                                <svg className="h-6 w-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" width="24" height="24">
                                    <path className=""
                                        d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z" />
                                </svg>
                                <span><strong className="text-black">12</strong> Followers you know</span>
                            </div>
                            <div className="flex">
                                <div className="flex justify-end mr-2">
                                    <img className="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                                    <img className="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/women/31.jpg" alt="" />
                                    <img className="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/men/33.jpg" alt="" />
                                    <img className="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/women/32.jpg" alt="" />
                                    <img className="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/men/44.jpg" alt="" />
                                    <img className="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/women/42.jpg" alt="" />
                                    <span className="flex items-center justify-center bg-white text-sm text-gray-800 font-semibold border-2 border-gray-200 rounded-full h-10 w-10">+999</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div></>
    )
}
