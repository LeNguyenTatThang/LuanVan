import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiPostRent } from '../Service/UserService';

const Manager = () => {
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedStatusForRent, setSelectedStatusForRent] = useState(null);

    const handleStatusChange = (status, isForRent) => {
        // Nếu trạng thái được chọn đã được chọn trước đó, ẩn nó đi
        if (isForRent) {
            setSelectedStatusForRent((prevStatus) =>
                prevStatus === status ? null : status
            );
            // Đồng thời ẩn trạng thái chưa chọn (nếu có)
            setSelectedStatus(null);
        } else {
            setSelectedStatus((prevStatus) => (prevStatus === status ? null : status));
            // Đồng thời ẩn trạng thái chưa chọn (nếu có)
            setSelectedStatusForRent(null);
        }
    };
    // Thêm màu 
    const getColor = (status) => {
        switch (status) {
            case 'Xác nhận':
                return 'bg-blue-500';
            case 'Chờ nhận':
                return 'bg-yellow-500';
            case 'Đang thuê':
                return 'bg-green-500';
            case 'Chờ trả':
                return 'bg-red-500';
            default:
                return 'bg-gray-200';
        }
    };
    //Xử lí api
    const userData = useSelector((state) => state.user);
    let users_id = userData.userInfo.id
    const apiRent = async () => {
        let res = await apiPostRent(users_id, 0);
        console.log(">>>check res: ", res)
        console.log(">>>check id: ", users_id)
    }
    useEffect(() => {
        apiRent();
    }, [])

    // Các điều kiện để xuất switch case
    const getContent = (status, isForRent) => {
        if (isForRent) {
            switch (status) {
                case 'Xác nhận':
                    return <p>Content for Xác nhận (cho thuê)</p>;
                case 'Chờ nhận':
                    return <p>Content for Chờ nhận (cho thuê)</p>;
                case 'Đang thuê':
                    return <p>Content for Đang thuê (cho thuê)</p>;
                case 'Chờ trả':
                    return <p>Content for Chờ trả (cho thuê)</p>;
                default:
                    return null;
            }
        } else {
            switch (status) {
                case 'Xác nhận':
                    return <p>Content for Xác nhận</p>;
                case 'Chờ nhận':
                    return <p>Content for Chờ nhận</p>;
                case 'Đang thuê':
                    return <p>Content for Đang thuê</p>;
                case 'Chờ trả':
                    return <p>Content for Chờ trả</p>;
                default:
                    return null;
            }
        }
    };

    return (
        <div className="container mx-auto mt-8">

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Quản lý đơn hàng thuê</h2>
                <div className="flex space-x-4 mb-4">
                    {['Xác nhận', 'Chờ nhận', 'Đang thuê', 'Chờ trả'].map((status) => (
                        <button
                            key={status}
                            onClick={() => handleStatusChange(status)}
                            className={`px-4 py-2 rounded focus:outline-none ${selectedStatus === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                                } hover:bg-gray-300`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                {selectedStatus && (
                    <div className={`p-4 rounded-md shadow-md ${getColor(selectedStatus)}`}>
                        <h3 className="text-xl font-bold mb-2 text-white">{selectedStatus}</h3>
                        {/* Nội dung cho trạng thái được chọn */}
                        {getContent(selectedStatus)}
                    </div>
                )}
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Quản lý đơn hàng cho thuê</h2>
                <div className="flex space-x-4 mb-4">
                    {['Xác nhận', 'Chờ nhận', 'Đang thuê', 'Chờ trả'].map((status) => (
                        <button
                            key={status}
                            onClick={() => handleStatusChange(status, true)}
                            className={`px-4 py-2 rounded focus:outline-none ${selectedStatusForRent === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                                } hover:bg-gray-300`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {selectedStatusForRent && (
                    <div className={`p-4 rounded-md shadow-md ${getColor(selectedStatusForRent)}`}>
                        <h3 className="text-xl font-bold mb-2 text-white">{selectedStatusForRent}</h3>
                        {getContent(selectedStatusForRent, true)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Manager;
