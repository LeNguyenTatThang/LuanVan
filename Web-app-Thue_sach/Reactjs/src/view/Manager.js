import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiCompleted, apiConfirmRentOne, apiConfirmRentThree, apiConfirmRentTwo, apiConfirmRental, apiOrderThree, apiPostRent, apiPostRentOne, apiPostRentTwo, apiRentOrder, apiRentOrderOne, apiRentOrderThree, apiRentOrderTwo } from '../Service/UserService';
import iziToast from 'izitoast';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
//hiển thị ngày được chuyển đổi từ chuỗi ngày-giờ 

const Manager = () => {

    //xử lí switch case bảng
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
            case 'Chờ gửi':
                return 'bg-orange-500';
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

    //Người thuê

    //Xử lí api chờ xác nhận của chủ tiệm phía người thuê
    const userData = useSelector((state) => state.user);
    const [confim, setConfim] = useState();
    let users_id = userData.userInfo.id
    const apiRent = async () => {
        let res = await apiPostRent(users_id, 0);
        if (res && res.status === 200) {
            setConfim(res.data.data)
        }
    }

    const [confimOne, setConfimOne] = useState();
    const apiRentOne = async () => {
        let res = await apiPostRentOne(users_id);
        if (res && res.status === 200) {
            setConfimOne(res.data.data);
        }
    }

    const [confirmedRentals, setConfirmedRentals] = useState([]);
    const handleConfirmClick = async (id) => {
        let ConfirmRental = await apiConfirmRental(id);
        if (ConfirmRental && ConfirmRental.status === 200) {
            setConfirmedRentals([...confirmedRentals, id]);
            iziToast.success({
                title: "Chúc mừng",
                position: "topRight",
                message: "Xác nhận thành công"
            })
        }
    };

    //button xác nhận lấy hàng của người thuê
    const [receivedItems, setReceivedItems] = useState([]);
    const handleReceiveClick = async (id, ngaythue, index) => {
        let confirmData = await apiConfirmRentOne(id, ngaythue);
        if (confirmData && confirmData.status === 200) {
            setReceivedItems([...receivedItems, index]);
            iziToast.success({
                title: "Chúc mừng",
                position: "topRight",
                message: "Xác nhận thành công"
            });
        }
    };

    const [showDataTwo, setShowDataTwo] = useState([]);
    const showDataTwoUser = async () => {
        let showData = await apiPostRentTwo(users_id);
        if (showData && showData.status === 200) {
            setShowDataTwo(showData.data.data)
        }
    }
    console.log("show data đang được thuê: ", showDataTwo)
    //api apiRentOrderThree
    const [RentOrderThree, setRentOrderThree] = useState();
    const callRentOrderThree = async () => {
        let res = await apiRentOrderThree(users_id);
        if (res && res.status === 200) {
            setRentOrderThree(res.data.data)
        }
    }
    console.log("show đang thuê của chủ tiệm", RentOrderThree)
    //button xác nhận lấy hàng của người thuê
    const [returnItems, setreturnItems] = useState([]);
    const handleReturn = async (id, index) => {
        let comData = await apiCompleted(id);
        if (comData && comData.status === 200) {
            setreturnItems([...returnItems, index]);
            iziToast.success({
                title: "Chúc mừng",
                position: "topRight",
                message: "Bạn đã trả hàng"
            });
        }
    };

    // Người cho thuê

    //apiRentOrder xác nhận của chủ tiệm
    const [RentOrder, setRentOrder] = useState();
    let chutiem_id = userData.userInfo.id
    const callRentOrder = async () => {
        let res = await apiRentOrder(chutiem_id, 0);
        if (res && res.status === 200) {
            setRentOrder(res.data.data)
        }
    }

    //api Chờ gửi của chủ tiệm
    const [RentOrderOne, setRentOrderOne] = useState();
    const callRentOrderOne = async () => {
        let res = await apiRentOrderOne(chutiem_id, 1);
        if (res && res.status === 200) {
            setRentOrderOne(res.data.data)
        }
    }
    console.log("check RentOrderOne", RentOrderOne)
    //api show danh sách apiRentOrderTwo (Đang thuê)
    const [RentOrderTwo, setRentOrderTwo] = useState();
    const callRentOrderTwo = async () => {
        let res = await apiRentOrderTwo(chutiem_id);
        if (res && res.status === 200) {
            setRentOrderTwo(res.data.data)
        }
    }
    console.log("show đang thuê của chủ tiệm", RentOrderTwo)
    //api xác nhận đã thu hồi sách (Chờ trả) apiOrderThree
    const [OrderThree, setOrderThree] = useState();
    const callOrderThree = async () => {
        let res = await apiOrderThree(chutiem_id);
        if (res && res.status === 200) {
            setOrderThree(res.data.data)
        }
    }
    console.log("show đang thuê của chủ tiệm", OrderThree)
    //chủ tiệm xác nhận lấy sách
    const [returnValue, setreturnValue] = useState([]);
    const handleReturnClick = async (id, index) => {
        let confirmData = await apiConfirmRentThree(id);
        if (confirmData && confirmData.status === 200) {
            setreturnValue([...returnValue, index]);
            iziToast.success({
                title: "Chúc mừng",
                position: "topRight",
                message: "Bạn đã trả hàng"
            });
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        apiRent();
        apiRentOne();
        callRentOrder();
        showDataTwoUser();
        callRentOrderOne();
        callRentOrderTwo();
        callRentOrderThree();
        callOrderThree();
        if (!userData.isLogin) {
            navigate('/');
        }
    }, [userData])



    // Các điều kiện để xuất switch case
    const getContent = (status, isForRent) => {
        if (isForRent) {
            switch (status) {
                case 'Xác nhận':
                    return (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">STT</th>
                                            <th className="py-2 px-4 border-b">Tên sách</th>
                                            <th className="py-2 px-4 border-b">Người thuê</th>
                                            <th className="py-2 px-4 border-b">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {RentOrder && RentOrder.length > 0 &&
                                            RentOrder.map((item, index) => (
                                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                                                    } hover:bg-gray-300`}>
                                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                                    <td className="py-2 px-4 border-b">{item.tensach}</td>
                                                    <td className="py-2 px-4 border-b">{item.nguoithue}</td>
                                                    <td className="py-2 px-4 border-b">
                                                        {confirmedRentals.includes(item.id) ? (
                                                            <span className="text-green-500">Đã xác nhận</span>
                                                        ) : (
                                                            <button
                                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                                onClick={() => handleConfirmClick(item.id)}
                                                            >
                                                                Xác nhận
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    );
                case 'Chờ gửi':
                    return (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">STT</th>
                                            <th className="py-2 px-4 border-b">Tên sách</th>
                                            <th className="py-2 px-4 border-b">Người thuê</th>
                                            <th className="py-2 px-4 border-b">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {RentOrder && RentOrder.length > 0 &&
                                            RentOrder.map((item, index) => (
                                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                                                    } hover:bg-gray-300`}>
                                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                                    <td className="py-2 px-4 border-b">{item.tensach}</td>
                                                    <td className="py-2 px-4 border-b">{item.nguoithue}</td>
                                                    <td className="py-2 px-4 border-b">
                                                        Gửi hàng
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    );
                case 'Đang thuê':
                    return (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">STT</th>
                                            <th className="py-2 px-4 border-b">Tên sách</th>
                                            <th className="py-2 px-4 border-b">Người thuê</th>
                                            <th className="py-2 px-4 border-b">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {RentOrderTwo && RentOrderTwo.length > 0 &&
                                            RentOrderTwo.map((item, index) => (
                                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                                                    } hover:bg-gray-300`}>
                                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                                    <td className="py-2 px-4 border-b">{item.tensach}</td>
                                                    <td className="py-2 px-4 border-b">{item.nguoithue}</td>
                                                    <td className="py-2 px-4 border-b">Sách được thuê từ ngày: {dayjs(item.ngaynhan).format(' DD-MM-YYYY')}<br />
                                                        Ngày trả sách vào: {dayjs(item.ngaytra).format(' DD-MM-YYYY')}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    );

                case 'Chờ trả':
                    return (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">STT</th>
                                            <th className="py-2 px-4 border-b">Tên sách</th>
                                            <th className="py-2 px-4 border-b">Chủ tiệm</th>
                                            <th className="py-2 px-4 border-b">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {OrderThree && OrderThree.length > 0 &&
                                            OrderThree.map((item, index) => (
                                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                                                    } hover:bg-gray-300`}>
                                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                                    <td className="py-2 px-4 border-b">{item.tensach}</td>
                                                    <td className="py-2 px-4 border-b">{item.nguoidang}</td>
                                                    <td className="py-2 px-4 border-b">
                                                        {returnValue.includes(index) ? (
                                                            <span>Xác nhận thành công</span>
                                                        ) : (
                                                            <button
                                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                                onClick={() => handleReturn(item.id, index)}
                                                            >
                                                                Xác nhận lấy sách
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    );
                default:
                    return null;
            }
        } else {
            switch (status) {
                case 'Xác nhận':
                    return (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">STT</th>
                                            <th className="py-2 px-4 border-b">Tên sách</th>
                                            <th className="py-2 px-4 border-b">Chủ tiệm</th>
                                            <th className="py-2 px-4 border-b">Số ngày thuê</th>
                                            <th className="py-2 px-4 border-b">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {confim && confim.length > 0 &&
                                            confim.map((item, index) => (
                                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                                                    } hover:bg-gray-300`}>
                                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                                    <td className="py-2 px-4 border-b">{item.tensach}</td>
                                                    <td className="py-2 px-4 border-b">{item.nguoidang}</td>
                                                    <td className="py-2 px-4 border-b">{item.ngaythue}</td>
                                                    <td className="py-2 px-4 border-b">Đang chờ duyệt</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    );
                case 'Chờ nhận':
                    return (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">STT</th>
                                            <th className="py-2 px-4 border-b">Tên sách</th>
                                            <th className="py-2 px-4 border-b">Chủ tiệm</th>
                                            <th className="py-2 px-4 border-b">Số ngày thuê</th>
                                            <th className="py-2 px-4 border-b">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {confimOne && confimOne.length > 0 &&
                                            confimOne.map((item, index) => (
                                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                                                    } hover:bg-gray-300`}>
                                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                                    <td className="py-2 px-4 border-b">{item.tensach}</td>
                                                    <td className="py-2 px-4 border-b">{item.nguoidang}</td>
                                                    <td className="py-2 px-4 border-b">{item.ngaythue} ngày</td>
                                                    <td className="py-2 px-4 border-b">

                                                        {receivedItems.includes(index) ? (
                                                            <span>Đã xác nhận lấy sách</span>
                                                        ) : (
                                                            <button
                                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                                onClick={() => handleReceiveClick(item.id, item.ngaythue, index)}
                                                            >
                                                                Nhận hàng
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    );
                case 'Đang thuê':
                    return (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">STT</th>
                                            <th className="py-2 px-4 border-b">Tên sách</th>
                                            <th className="py-2 px-4 border-b">Chủ tiệm</th>
                                            <th className="py-2 px-4 border-b">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {showDataTwo && showDataTwo.length > 0 &&
                                            showDataTwo.map((item, index) => (
                                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                                                    } hover:bg-gray-300`}>
                                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                                    <td className="py-2 px-4 border-b">{item.tensach}</td>
                                                    <td className="py-2 px-4 border-b">{item.nguoidang}</td>
                                                    <td className="py-2 px-4 border-b">Bạn đã thuê sách từ ngày: {dayjs(item.ngaynhan).format(' DD-MM-YYYY')}<br />
                                                        Ngày trả sách của bạn vào ngày: {dayjs(item.ngaytra).format(' DD-MM-YYYY')}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    );
                case 'Chờ trả':
                    return (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">STT</th>
                                            <th className="py-2 px-4 border-b">Tên sách</th>
                                            <th className="py-2 px-4 border-b">Chủ tiệm</th>
                                            <th className="py-2 px-4 border-b">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {RentOrderThree && RentOrderThree.length > 0 &&
                                            RentOrderThree.map((item, index) => (
                                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                                                    } hover:bg-gray-300`}>
                                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                                    <td className="py-2 px-4 border-b">{item.tensach}</td>
                                                    <td className="py-2 px-4 border-b">{item.nguoidang}</td>
                                                    <td className="py-2 px-4 border-b">Đang chờ chủ tiệm nhận sách
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    );
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
                    {['Xác nhận', 'Chờ gửi', 'Đang thuê', 'Chờ trả'].map((status) => (
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
