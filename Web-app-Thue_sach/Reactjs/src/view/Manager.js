import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiCancel, apiCompleted, apiConfirmRentOne, apiConfirmRentThree, apiConfirmRental, apiHuyDon1, apiHuyDon2, apiOrderFour, apiOrderThree, apiPostRent, apiPostRentOne, apiPostRentTwo, apiRentOrder, apiRentOrderFour, apiRentOrderOne, apiRentOrderThree, apiRentOrderTwo } from '../Service/UserService';
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
            case 'Chờ giao':
                return 'bg-orange-500';
            case 'Chờ nhận':
                return 'bg-yellow-500';
            case 'Đang thuê':
                return 'bg-green-500';
            case 'Chờ trả':
                return 'bg-red-500';
            case 'Hoàn thành':
                return 'bg-stone-500';
            case 'Đã hủy':
                return 'bg-stone-500';
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
        setLoading(true)
        setButtonClicked('confirm');
        let ConfirmRental = await apiConfirmRental(id);
        if (ConfirmRental && ConfirmRental.status === 200) {
            setConfirmedRentals([...confirmedRentals, id]);
            iziToast.success({
                title: "Chúc mừng",
                position: "topRight",
                message: "Xác nhận thành công"
            })
        }
        setTimeout(() => {
            window.location.reload();
        }, 2000);
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
    const handleReturn = async (id) => {
        setLoading(true);
        let comData = await apiCompleted(id);

        if (comData && comData.status === 200) {
            iziToast.success({
                title: "Chúc mừng",
                position: "topRight",
                message: "Bạn đã trả hàng"
            });

            // Sử dụng setTimeout để chờ 2 giây trước khi reload
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            // Xử lý trường hợp xác nhận không thành công
            setLoading(false);
            // Hiển thị thông báo lỗi hoặc thực hiện các bước xử lý khác
        }
    };


    // Người cho thuê

    //apiRentOrder xác nhận của chủ tiệm
    const [RentOrder, setRentOrder] = useState([]);

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
    const [loading, setLoading] = useState(false);
    const handleReturnClick = async (id, index) => {
        setLoading(true);
        let confirmData = await apiCancel(id);
        if (confirmData && confirmData.status === 200) {
            setreturnValue([...returnValue, index]);
            iziToast.success({
                title: "Sách đã được hoàn",
                position: "topRight",
            });
        }
        setTimeout(() => {
            window.location.reload();
        }, 2000);
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
        callHuyDon();
        callHuyDon1();
        apiCompleted2();
        apiCompleted1();
        if (!userData.isLogin) {
            navigate('/');
        }
    }, [userData])

    //apiCancel
    const handleCanClick = async (id) => {
        setButtonClicked('cancel');
        let cancel = await apiCancel(id);
        if (cancel && cancel.status === 200) {
            iziToast.success({
                title: "Hủy đơn hàng",
                position: "topRight",
            })
        }
        navigate('/manager-book');
    };
    const [buttonClicked, setButtonClicked] = useState(null);


    const [showModal, setShowModal] = React.useState(false);
    const [filterData, setFilterData] = useState([]);
    const [filterData1, setFilterData1] = useState([]);
    const handleEditInfo = async (id) => {
        const filteredData = RentOrderThree.filter(item => item.id === id);
        setFilterData(filteredData);
        console.log("filter data", filteredData);
        setShowModal(true);
    }
    const handleEditInfo1 = async (id) => {
        if (confim) {
            const filteredData = confim.filter(item => item.id === id);
            if (filteredData.length > 0) {
                setFilterData1(filteredData);
                console.log("filter data", filteredData);
                setShowModal(true);
            } else {
                console.error("No item found with the specified id:", id);
            }
        } else {
            console.error("RentOrder is undefined.");
        }
    }
    const [filterData2, setFilterData2] = useState([]);
    const handleEditInfo2 = async (id) => {
        if (RentOrder) {
            const filteredData = RentOrder.filter(item => item.id === id);
            if (filteredData.length > 0) {
                setFilterData2(filteredData);
                console.log("filter data", filteredData);
                setShowModal(true);
            } else {
                console.error("No item found with the specified id:", id);
            }
        } else {
            console.error(" is undefined.");
        }
    }
    //confimOne
    const [filterData3, setFilterData3] = useState([]);
    const handleEditInfo3 = async (id) => {
        if (confimOne) {
            const filteredData = confimOne.filter(item => item.id === id);
            if (filteredData.length > 0) {
                setFilterData3(filteredData);
                console.log("filter data", filteredData);
                setShowModal(true);
            } else {
                console.error("No item found with the specified id:", id);
            }
        } else {
            console.error("is undefined.");
        }
    }
    //RentOrder
    const [filterData4, setFilterData4] = useState([]);
    const handleEditInfo4 = async (id) => {
        if (RentOrderOne) {
            const filteredData = RentOrderOne.filter(item => item.id === id);
            if (filteredData.length > 0) {
                setFilterData4(filteredData);
                console.log("filter data", filteredData);
                setShowModal(true);
            } else {
                console.error("No item found with the specified id:", id);
            }
        } else {
            console.error("RentOrder is undefined.");
        }
    }
    const [filterData5, setFilterData5] = useState([]);
    const handleEditInfo5 = async (id) => {
        if (showDataTwo) {
            const filteredData = showDataTwo.filter(item => item.id === id);
            if (filteredData.length > 0) {
                setFilterData5(filteredData);
                console.log("filter data", filteredData);
                setShowModal(true);
            } else {
                console.error("No item found with the specified id:", id);
            }
        } else {
            console.error("RentOrder is undefined.");
        }
    }
    const [filterData6, setFilterData6] = useState([]);
    const handleEditInfo6 = async (id) => {
        if (RentOrderTwo) {
            const filteredData = RentOrderTwo.filter(item => item.id === id);
            if (filteredData.length > 0) {
                setFilterData6(filteredData);
                console.log("filter data", filteredData);
                setShowModal(true);
            } else {
                console.error("No item found with the specified id:", id);
            }
        } else {
            console.error("RentOrder is undefined.");
        }
    }
    //OrderThree
    const [filterData7, setFilterData7] = useState([]);
    const handleEditInfo7 = async (id) => {
        if (OrderThree) {
            const filteredData = OrderThree.filter(item => item.id === id);
            if (filteredData.length > 0) {
                setFilterData7(filteredData);
                console.log("filter data", filteredData);
                setShowModal(true);
            } else {
                console.error("No item found with the specified id:", id);
            }
        } else {
            console.error("RentOrder is undefined.");
        }
    }
    const handleCloseChange = () => {
        setShowModal(false);
    }
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Hóa đơn Thuê sách online</title>');
        printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">');
        printWindow.document.write('<style>');
        printWindow.document.write('body { font-family: Arial, sans-serif; font-size: 12px; display: flex; justify-content: center; height: 100vh; }');
        printWindow.document.write('.content-container { max-width: 600px; width: 100%; }'); // Điều chỉnh chiều rộng nếu cần
        printWindow.document.write('</style></head><body>');

        // Thêm nội dung hóa đơn vào cửa sổ in trước
        printWindow.document.write('<div class="content-container">');
        printWindow.document.write('<h1 class="text-2xl font-bold mb-4">Thông tin hóa đơn</h1>');

        // Hiển thị thông tin hàng dọc
        filterData.forEach((dataFilter, index) => {
            printWindow.document.write(`
                <div class="mb-4">
                    <p class="mb-1"><span class="font-bold">Mã phiếu:</span> ${dataFilter.maphieu}</p>
                    <p class="mb-1"><span class="font-bold">Mã sách:</span> ${dataFilter.masach}</p>
                    <p class="mb-1"><span class="font-bold">Người thuê:</span> ${dataFilter.nguoithue}</p>
                    <p class="mb-1"><span class="font-bold">SĐT người thuê:</span> ${dataFilter.sdtnguoithue}</p>
                    <p class="mb-1"><span class="font-bold">Địa chỉ người thuê:</span> ${dataFilter.diachinguoithue}</p>
                    <p class="mb-1"><span class="font-bold">Tên sách:</span> ${dataFilter.tensach}</p>
                    <p class="mb-1"><span class="font-bold">Số ngày thuê:</span> ${dataFilter.ngaythue} ngày</p>
                    <p class="mb-1"><span class="font-bold">Ngày nhận:</span> ${dayjs(dataFilter.ngaynhan).format(' DD-MM-YYYY')}</p>
                    <p class="mb-1"><span class="font-bold">Ngày trả:</span> ${dayjs(dataFilter.ngaytra).format(' DD-MM-YYYY')}</p>
                    <p class="mb-1"><span class="font-bold">Tiền cọc:</span> ${formatCurrency(dataFilter.tiencoc)}vnd</p>
                    <p class="mb-1"><span class="font-bold">Tổng tiền:</span> ${formatCurrency(dataFilter.tongtien)}vnd</p>
                    <p class="mb-1"><span class="font-bold">Người đăng:</span> ${dataFilter.nguoidang}</p>
                    <p class="mb-1"><span class="font-bold">SDT người đăng:</span> ${dataFilter.sdtnguoidang}</p>
                    <p class="mb-1"><span class="font-bold">Địa chỉ người đăng:</span> ${dataFilter.diachinguoidang}</p>
                </tr>
            `);
        });
        printWindow.document.write('</tbody></table>');

        // Kết thúc nội dung và hiển thị trước trang in
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
    const formatCurrency = (value) => {
        if (typeof value === 'number') {
            // Nếu là kiểu number, sử dụng toLocaleString để định dạng
            return value.toLocaleString('en-US');
        } else if (typeof value === 'string') {
            // Nếu là kiểu string, chèn dấu "." vào giữa chuỗi để định dạng
            return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            // Trường hợp khác, trả về giá trị nguyên thủy
            return value;
        }
    };

    const [huyDon, setHuyDon] = useState([])
    const callHuyDon = async () => {
        let huy = await apiHuyDon1(users_id)
        if (huy && huy.status === 200) {
            setHuyDon(huy.data.data)
        }
    }
    const [huyDon1, setHuyDon1] = useState()
    const callHuyDon1 = async () => {
        let huy = await apiHuyDon2(chutiem_id)
        if (huy && huy.status === 200) {
            setHuyDon1(huy.data.data)
        }
    }
    //Cac hon hang hoan thanh complete
    const [complete, setComplete] = useState()
    const apiCompleted2 = async () => {
        let com = await apiOrderFour(chutiem_id)
        if (com && com.status === 200) {
            setComplete(com.data.data)
        }
    }
    const [complete1, setComplete1] = useState()
    const apiCompleted1 = async () => {
        let com1 = await apiRentOrderFour(users_id)
        if (com1 && com1.status === 200) {
            setComplete1(com1.data.data)
        }
    }
    const handleiConfirm = async (id) => {
        setLoading(true);
        let comfrim = await apiConfirmRentThree(id)

        if (comfrim && comfrim.status === 200) {
            iziToast.success({
                title: "Sách đã được hoàn",
                position: "topRight",
            });
        }
        setTimeout(() => {
            window.location.reload();
        }, 2000);

    }
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
                                            <th className="py-2 px-4 border-b">In hóa đơn</th>
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
                                                        ) : (<>
                                                            <div>
                                                                <button
                                                                    className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1 ${buttonClicked === 'confirm' ? 'opacity-50 cursor-not-allowed' : ''
                                                                        }`}
                                                                    onClick={() => handleConfirmClick(item.id)}
                                                                    disabled={buttonClicked === 'cancel'}
                                                                >
                                                                    {buttonClicked === 'confirm' ? 'Đã Xác nhận' : 'Xác nhận'}
                                                                </button>

                                                                <button
                                                                    className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1 ${buttonClicked === 'cancel' ? 'opacity-50 cursor-not-allowed' : ''
                                                                        }`}
                                                                    onClick={() => handleCanClick(item.id)}
                                                                    disabled={buttonClicked === 'confirm'}
                                                                >
                                                                    {buttonClicked === 'cancel' ? 'Đã Hủy đơn' : 'Hủy đơn'}
                                                                </button>
                                                            </div>
                                                        </>
                                                        )}
                                                    </td>
                                                    <td className="py-2 px-4 border-b flex items-center justify-evenly">
                                                        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleEditInfo2(item.id)}>Xem</button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            {showModal ? (
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="relative w-11/12 my-6 mx-auto">
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                                    <h3 className="text-3xl font-semibold w-96">Thông tin chi tiết hóa đơn</h3>
                                                </div>
                                                <div className="relative p-6 flex-auto mx-auto">
                                                    <table className="table-auto bg-white border border-gray-300">
                                                        <thead>
                                                            <tr className="bg-gray-200">
                                                                <th className="border p-2">Mã phiếu thuê</th>
                                                                <th className="border p-2">Mã sách</th>
                                                                <th className="border p-2">Người thuê</th>
                                                                <th className="border p-2">Sdt người thuê</th>
                                                                <th className="border p-2">Đ/c người thuê</th>
                                                                <th className="border p-2">Tên sách</th>
                                                                <th className="border p-2">Số ngày thuê</th>
                                                                <th className="border p-2">Tiền cọc</th>
                                                                <th className="border p-2">Tổng tiền</th>
                                                                <th className="border p-2">Người đăng</th>
                                                                <th className="border p-2">Sdt người đăng</th>
                                                                <th className="border p-2">Đ/c người đăng</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filterData2.map((dataFilter, index) => (
                                                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                                                                    <td className="border p-2">{dataFilter.maphieu}</td>
                                                                    <td className="border p-2">{dataFilter.masach}</td>
                                                                    <td className="border p-2">{dataFilter.nguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.sdtnguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.diachinguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.tensach}</td>
                                                                    <td className="border p-2">{dataFilter.ngaythue} ngày</td>
                                                                    <td className="border p-2">{formatCurrency(dataFilter.tiencoc)}vnđ</td>
                                                                    <td className="border p-2">{formatCurrency(dataFilter.tongtien)}vnđ</td>
                                                                    <td className="border p-2">{dataFilter.nguoidang}</td>
                                                                    <td className="border p-2">{dataFilter.sdtnguoidang}</td>
                                                                    <td className="border p-2">{dataFilter.diachinguoidang}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                </div>
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={handleCloseChange}
                                                    >
                                                        Đóng
                                                    </button>
                                                    <button
                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={handlePrint}
                                                    >
                                                        In
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null}
                        </>
                    );
                case 'Chờ giao':
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
                                            <th className="py-2 px-4 border-b">Xem hóa đơn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {RentOrderOne && RentOrderOne.length > 0 &&
                                            RentOrderOne.map((item, index) => (
                                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                                                    } hover:bg-gray-300`}>
                                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                                    <td className="py-2 px-4 border-b">{item.tensach}</td>
                                                    <td className="py-2 px-4 border-b">{item.nguoithue}</td>
                                                    <td className="py-2 px-4 border-b">
                                                        Gửi hàng
                                                    </td>
                                                    <td className="py-2 px-4 border-b flex items-center justify-evenly">
                                                        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleEditInfo4(item.id)}>Xem</button>
                                                        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleReturnClick(item.id)} disabled={loading}>{loading ? 'Loading...' : 'Hủy đơn hàng'}</button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            {showModal ? (
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="relative w-11/12 my-6 mx-auto">
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                                    <h3 className="text-3xl font-semibold w-96">Thông tin chi tiết hóa đơn</h3>
                                                </div>
                                                <div className="relative p-6 flex-auto mx-auto">
                                                    <table className="table-auto bg-white border border-gray-300">
                                                        <thead>
                                                            <tr className="bg-gray-200">
                                                                <th className="border p-2">Mã phiếu thuê</th>
                                                                <th className="border p-2">Mã sách</th>
                                                                <th className="border p-2">Người thuê</th>
                                                                <th className="border p-2">Sdt người thuê</th>
                                                                <th className="border p-2">Đ/c người thuê</th>
                                                                <th className="border p-2">Tên sách</th>
                                                                <th className="border p-2">Số ngày thuê</th>
                                                                <th className="border p-2">Tiền cọc</th>
                                                                <th className="border p-2">Tổng tiền</th>
                                                                <th className="border p-2">Người đăng</th>
                                                                <th className="border p-2">Sdt người đăng</th>
                                                                <th className="border p-2">Đ/c người đăng</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filterData4.map((dataFilter, index) => (
                                                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                                                                    <td className="border p-2">{dataFilter.maphieu}</td>
                                                                    <td className="border p-2">{dataFilter.masach}</td>
                                                                    <td className="border p-2">{dataFilter.nguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.sdtnguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.diachinguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.tensach}</td>
                                                                    <td className="border p-2">{dataFilter.ngaythue} ngày</td>
                                                                    <td className="border p-2">{formatCurrency(dataFilter.tiencoc)}vnđ</td>
                                                                    <td className="border p-2">{formatCurrency(dataFilter.tongtien)}vnđ</td>
                                                                    <td className="border p-2">{dataFilter.nguoidang}</td>
                                                                    <td className="border p-2">{dataFilter.sdtnguoidang}</td>
                                                                    <td className="border p-2">{dataFilter.diachinguoidang}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                </div>
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={handleCloseChange}
                                                    >
                                                        Đóng
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null}
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
                                            <th className="py-2 px-4 border-b">Thông báo</th>
                                            <th className="py-2 px-4 border-b">Xem hóa đơn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {RentOrderTwo && RentOrderTwo.length > 0 &&
                                            RentOrderTwo.map((item, index) => (
                                                <tr key={index} className={`${index % 2 === 0 ? 'hover:bg-gray-100' : 'hover:bg-gray-200'
                                                    } hover:bg-gray-300`}>
                                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                                    <td className="py-2 px-4 border-b">{item.tensach}</td>
                                                    <td className="py-2 px-4 border-b">{item.nguoithue}</td>
                                                    <td className="py-2 px-4 border-b">Ngày nhận: {dayjs(item.ngaynhan).format(' DD-MM-YYYY')}<br />
                                                        Ngày trả: {dayjs(item.ngaytra).format(' DD-MM-YYYY')}
                                                    </td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.thongbao}</td>
                                                    <td className="py-2 px-4 border-b flex items-center justify-evenly">
                                                        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleEditInfo6(item.id)}>Xem</button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            {showModal ? (
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="relative w-11/12 my-6 mx-auto">
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                                    <h3 className="text-3xl font-semibold w-96">Thông tin chi tiết hóa đơn</h3>
                                                </div>
                                                <div className="relative p-6 flex-auto mx-auto">
                                                    <table className="table-auto bg-white border border-gray-300">
                                                        <thead>
                                                            <tr className="bg-gray-200">
                                                                <th className="border p-2">Mã phiếu thuê</th>
                                                                <th className="border p-2">Mã sách</th>
                                                                <th className="border p-2">Người thuê</th>
                                                                <th className="border p-2">Sdt người thuê</th>
                                                                <th className="border p-2">Đ/c người thuê</th>
                                                                <th className="border p-2">Tên sách</th>
                                                                <th className="border p-2">Số ngày thuê</th>
                                                                <th className="border p-2">Ngày nhận</th>
                                                                <th className="border p-2">Ngày trả</th>
                                                                <th className="border p-2">Tiền cọc</th>
                                                                <th className="border p-2">Tổng tiền</th>
                                                                <th className="border p-2">Người đăng</th>
                                                                <th className="border p-2">Sdt người đăng</th>
                                                                <th className="border p-2">Đ/c người đăng</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filterData6.map((dataFilter, index) => (
                                                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                                                                    <td className="border p-2">{dataFilter.maphieu}</td>
                                                                    <td className="border p-2">{dataFilter.masach}</td>
                                                                    <td className="border p-2">{dataFilter.nguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.sdtnguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.diachinguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.tensach}</td>
                                                                    <td className="border p-2">{dataFilter.ngaythue} ngày</td>
                                                                    <td className="border p-2">{dayjs(dataFilter.ngaynhan).format(' DD-MM-YYYY')}</td>
                                                                    <td className="border p-2">{dayjs(dataFilter.ngaynhan).format(' DD-MM-YYYY')}</td>
                                                                    <td className="border p-2">{formatCurrency(dataFilter.tiencoc)}vnđ</td>
                                                                    <td className="border p-2">{formatCurrency(dataFilter.tongtien)}vnđ</td>
                                                                    <td className="border p-2">{dataFilter.nguoidang}</td>
                                                                    <td className="border p-2">{dataFilter.sdtnguoidang}</td>
                                                                    <td className="border p-2">{dataFilter.diachinguoidang}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                </div>
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={handleCloseChange}
                                                    >
                                                        Đóng
                                                    </button>
                                                    <button
                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={handlePrint}
                                                    >
                                                        In
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null}
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
                                            <th className="py-2 px-4 border-b">In hóa đơn</th>
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
                                                                onClick={() => handleReturn(item.id)}
                                                                disabled={loading}>{loading ? 'Loading...' : 'Xác nhận lấy sách'}</button>
                                                        )}
                                                    </td>
                                                    <td className="py-2 px-4 border-b flex items-center justify-evenly">
                                                        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleEditInfo7(item.id)}>Xem</button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            {showModal ? (
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="relative w-11/12 my-6 mx-auto">
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                                    <h3 className="text-3xl font-semibold w-96">Thông tin chi tiết hóa đơn</h3>
                                                </div>
                                                <div className="relative p-6 flex-auto mx-auto">
                                                    <table className="table-auto bg-white border border-gray-300">
                                                        <thead>
                                                            <tr className="bg-gray-200">
                                                                <th className="border p-2">Mã phiếu thuê</th>
                                                                <th className="border p-2">Mã sách</th>
                                                                <th className="border p-2">Người thuê</th>
                                                                <th className="border p-2">Sdt người thuê</th>
                                                                <th className="border p-2">Đ/c người thuê</th>
                                                                <th className="border p-2">Tên sách</th>
                                                                <th className="border p-2">Số ngày thuê</th>
                                                                <th className="border p-2">Ngày nhận</th>
                                                                <th className="border p-2">Ngày trả</th>
                                                                <th className="border p-2">Tiền cọc</th>
                                                                <th className="border p-2">Tổng tiền</th>
                                                                <th className="border p-2">Người đăng</th>
                                                                <th className="border p-2">Sdt người đăng</th>
                                                                <th className="border p-2">Đ/c người đăng</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filterData7.map((dataFilter, index) => (
                                                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                                                                    <td className="border p-2">{dataFilter.maphieu}</td>
                                                                    <td className="border p-2">{dataFilter.masach}</td>
                                                                    <td className="border p-2">{dataFilter.nguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.sdtnguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.diachinguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.tensach}</td>
                                                                    <td className="border p-2">{dataFilter.ngaythue} ngày</td>
                                                                    <td className="border p-2">{dayjs(dataFilter.ngaynhan).format(' DD-MM-YYYY')}</td>
                                                                    <td className="border p-2">{dayjs(dataFilter.ngaynhan).format(' DD-MM-YYYY')}</td>
                                                                    <td className="border p-2">{formatCurrency(dataFilter.tiencoc)}vnđ</td>
                                                                    <td className="border p-2">{formatCurrency(dataFilter.tongtien)}vnđ</td>
                                                                    <td className="border p-2">{dataFilter.nguoidang}</td>
                                                                    <td className="border p-2">{dataFilter.sdtnguoidang}</td>
                                                                    <td className="border p-2">{dataFilter.diachinguoidang}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                </div>
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={handleCloseChange}
                                                    >
                                                        Đóng
                                                    </button>
                                                    <button
                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={handlePrint}
                                                    >
                                                        In
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null}
                        </>
                    );
                case 'Hoàn thành':
                    return (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">STT</th>
                                            <th className="py-2 px-4 border-b">Tên sách</th>
                                            <th className="py-2 px-4 border-b">Người thuê</th>
                                            <th className="py-2 px-4 border-b">Người đăng</th>
                                            <th className="py-2 px-4 border-b">Mã phiếu</th>
                                            <th className="py-2 px-4 border-b">Địa chỉ người đăng</th>
                                            <th className="py-2 px-4 border-b">Địa chỉ người thuê</th>
                                            <th className="py-2 px-4 border-b">SDT người đăng</th>
                                            <th className="py-2 px-4 border-b">SDT người Thuê</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {complete && complete.length > 0 &&
                                            complete.map((item, index) => (
                                                <tr key={index} className={`${index % 2 === 0 ? 'hover:bg-gray-100' : 'hover:bg-gray-200'
                                                    } hover:bg-gray-300`}>
                                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                                    <td className="py-2 px-4 border-b">{item.tensach}</td>
                                                    <td className="py-2 px-4 border-b">{item.nguoithue}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.nguoidang}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.maphieu}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.diachinguoidang}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.diachinguoithue}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.sdtnguoidang}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.sdtnguoithue}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    );
                case 'Đã hủy':
                    return (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">STT</th>
                                            <th className="py-2 px-4 border-b">Tên sách</th>
                                            <th className="py-2 px-4 border-b">Người thuê</th>
                                            <th className="py-2 px-4 border-b">Người đăng</th>
                                            <th className="py-2 px-4 border-b">Mã phiếu</th>
                                            <th className="py-2 px-4 border-b">Địa chỉ người đăng</th>
                                            <th className="py-2 px-4 border-b">Địa chỉ người thuê</th>
                                            <th className="py-2 px-4 border-b">SDT người đăng</th>
                                            <th className="py-2 px-4 border-b">SDT người Thuê</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {huyDon1 && huyDon1.length > 0 &&
                                            huyDon1.map((item, index) => (
                                                <tr key={index} className={`${index % 2 === 0 ? 'hover:bg-gray-100' : 'hover:bg-gray-200'
                                                    } hover:bg-gray-300`}>
                                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                                    <td className="py-2 px-4 border-b">{item.tensach}</td>
                                                    <td className="py-2 px-4 border-b">{item.nguoithue}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.nguoidang}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.maphieu}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.diachinguoidang}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.diachinguoithue}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.sdtnguoidang}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.sdtnguoithue}</td>
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
                                            <th className="py-2 px-4 border-b">In hóa đơn</th>
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
                                                    <td className="py-2 px-4 border-b flex items-center justify-evenly">
                                                        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleEditInfo1(item.id)}>Xem</button>
                                                        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleReturnClick(item.id)} disabled={loading}>{loading ? 'Loading...' : 'Hủy sách'}</button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            {showModal ? (
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="relative w-11/12 my-6 mx-auto">
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                                    <h3 className="text-3xl font-semibold w-96">Thông tin chi tiết hóa đơn</h3>
                                                </div>
                                                <div className="relative p-6 flex-auto mx-auto">
                                                    <table className="table-auto bg-white border border-gray-300">
                                                        <thead>
                                                            <tr className="bg-gray-200">
                                                                <th className="border p-2">Mã phiếu thuê</th>
                                                                <th className="border p-2">Mã sách</th>
                                                                <th className="border p-2">Người thuê</th>
                                                                <th className="border p-2">Sdt người thuê</th>
                                                                <th className="border p-2">Đ/c người thuê</th>
                                                                <th className="border p-2">Tên sách</th>
                                                                <th className="border p-2">Số ngày thuê</th>
                                                                <th className="border p-2">Tiền cọc</th>
                                                                <th className="border p-2">Tổng tiền</th>
                                                                <th className="border p-2">Người đăng</th>
                                                                <th className="border p-2">Sdt người đăng</th>
                                                                <th className="border p-2">Đ/c người đăng</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filterData1.map((dataFilter, index) => (
                                                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                                                                    <td className="border p-2">{dataFilter.maphieu}</td>
                                                                    <td className="border p-2">{dataFilter.masach}</td>
                                                                    <td className="border p-2">{dataFilter.nguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.sdtnguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.diachinguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.tensach}</td>
                                                                    <td className="border p-2">{dataFilter.ngaythue} ngày</td>
                                                                    <td className="border p-2">{formatCurrency(dataFilter.tiencoc)}vnđ</td>
                                                                    <td className="border p-2">{formatCurrency(dataFilter.tongtien)}vnđ</td>
                                                                    <td className="border p-2">{dataFilter.nguoidang}</td>
                                                                    <td className="border p-2">{dataFilter.sdtnguoidang}</td>
                                                                    <td className="border p-2">{dataFilter.diachinguoidang}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                </div>
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={handleCloseChange}
                                                    >
                                                        Đóng
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null}
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
                                            <th className="py-2 px-4 border-b">Xem hóa đơn</th>
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
                                                    <td className="py-2 px-4 border-b flex items-center justify-evenly">
                                                        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleEditInfo3(item.id)}>Xem</button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            {showModal ? (
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="relative w-11/12 my-6 mx-auto">
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                                    <h3 className="text-3xl font-semibold w-96">Thông tin chi tiết hóa đơn</h3>
                                                </div>
                                                <div className="relative p-6 flex-auto mx-auto">
                                                    <table className="table-auto bg-white border border-gray-300">
                                                        <thead>
                                                            <tr className="bg-gray-200">
                                                                <th className="border p-2">Mã phiếu thuê</th>
                                                                <th className="border p-2">Mã sách</th>
                                                                <th className="border p-2">Người thuê</th>
                                                                <th className="border p-2">Sdt người thuê</th>
                                                                <th className="border p-2">Đ/c người thuê</th>
                                                                <th className="border p-2">Tên sách</th>
                                                                <th className="border p-2">Số ngày thuê</th>
                                                                <th className="border p-2">Tiền cọc</th>
                                                                <th className="border p-2">Tổng tiền</th>
                                                                <th className="border p-2">Người đăng</th>
                                                                <th className="border p-2">Sdt người đăng</th>
                                                                <th className="border p-2">Đ/c người đăng</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filterData3.map((dataFilter, index) => (
                                                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                                                                    <td className="border p-2">{dataFilter.maphieu}</td>
                                                                    <td className="border p-2">{dataFilter.masach}</td>
                                                                    <td className="border p-2">{dataFilter.nguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.sdtnguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.diachinguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.tensach}</td>
                                                                    <td className="border p-2">{dataFilter.ngaythue} ngày</td>
                                                                    <td className="border p-2">{formatCurrency(dataFilter.tiencoc)}vnđ</td>
                                                                    <td className="border p-2">{formatCurrency(dataFilter.tongtien)}vnđ</td>
                                                                    <td className="border p-2">{dataFilter.nguoidang}</td>
                                                                    <td className="border p-2">{dataFilter.sdtnguoidang}</td>
                                                                    <td className="border p-2">{dataFilter.diachinguoidang}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                </div>
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={handleCloseChange}
                                                    >
                                                        Đóng
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null}
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
                                            <th className="py-2 px-4 border-b">Giá thuê</th>
                                            <th className='py-2 px-4 border-b'>Thông báo</th>
                                            <th className="py-2 px-4 border-b">Thao tác</th>
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
                                                    <td className="py-2 px-4 border-b">Ngày thuê: {dayjs(item.ngaynhan).format(' DD-MM-YYYY')}<br />
                                                        Ngày trả: {dayjs(item.ngaytra).format(' DD-MM-YYYY')}
                                                    </td>
                                                    <td className="py-2 px-4 border-b">{item.tongtien}vnđ</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.thongbao}</td>
                                                    <td className="py-2 px-4 border-b flex items-center justify-evenly gap-2">
                                                        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleEditInfo5(item.id)}>Xem</button>
                                                        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleiConfirm(item.id)} disabled={loading}>{loading ? 'Loading...' : 'Trả sách'}</button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            {showModal ? (
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="relative w-11/12 my-6 mx-auto">
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                                    <h3 className="text-3xl font-semibold w-96">Thông tin chi tiết hóa đơn</h3>
                                                </div>
                                                <div className="relative p-6 flex-auto mx-auto">
                                                    <table className="table-auto bg-white border border-gray-300">
                                                        <thead>
                                                            <tr className="bg-gray-200">
                                                                <th className="border p-2">Mã phiếu thuê</th>
                                                                <th className="border p-2">Mã sách</th>
                                                                <th className="border p-2">Người thuê</th>
                                                                <th className="border p-2">Sdt người thuê</th>
                                                                <th className="border p-2">Đ/c người thuê</th>
                                                                <th className="border p-2">Tên sách</th>
                                                                <th className="border p-2">Số ngày thuê</th>
                                                                <th className="border p-2">Ngày nhận</th>
                                                                <th className="border p-2">Ngày trả</th>
                                                                <th className="border p-2">Tiền cọc</th>
                                                                <th className="border p-2">Tổng tiền</th>
                                                                <th className="border p-2">Người đăng</th>
                                                                <th className="border p-2">Sdt người đăng</th>
                                                                <th className="border p-2">Đ/c người đăng</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filterData5.map((dataFilter, index) => (
                                                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                                                                    <td className="border p-2">{dataFilter.maphieu}</td>
                                                                    <td className="border p-2">{dataFilter.masach}</td>
                                                                    <td className="border p-2">{dataFilter.nguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.sdtnguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.diachinguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.tensach}</td>
                                                                    <td className="border p-2">{dataFilter.ngaythue} ngày</td>
                                                                    <td className="border p-2">{dayjs(dataFilter.ngaynhan).format(' DD-MM-YYYY')}</td>
                                                                    <td className="border p-2">{dayjs(dataFilter.ngaynhan).format(' DD-MM-YYYY')}</td>
                                                                    <td className="border p-2">{formatCurrency(dataFilter.tiencoc)}vnđ</td>
                                                                    <td className="border p-2">{formatCurrency(dataFilter.tongtien)}vnđ</td>
                                                                    <td className="border p-2">{dataFilter.nguoidang}</td>
                                                                    <td className="border p-2">{dataFilter.sdtnguoidang}</td>
                                                                    <td className="border p-2">{dataFilter.diachinguoidang}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                </div>
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={handleCloseChange}
                                                    >
                                                        Đóng
                                                    </button>
                                                    <button
                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={handlePrint}
                                                    >
                                                        In
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null}
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
                                            <th className="py-2 px-4 border-b">In hóa đơn</th>
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
                                                    <td className="py-2 px-4 border-b flex items-center justify-evenly">
                                                        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleEditInfo(item.id)}>Xem</button>


                                                    </td>
                                                </tr>

                                            ))

                                        }
                                    </tbody>
                                </table>
                            </div>
                            {showModal ? (
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="relative w-11/12 my-6 mx-auto">
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                                    <h3 className="text-3xl font-semibold w-96">Thông tin chi tiết hóa đơn</h3>
                                                </div>
                                                <div className="relative p-6 flex-auto mx-auto">
                                                    <table className="table-auto bg-white border border-gray-300">
                                                        <thead>
                                                            <tr className="bg-gray-200">
                                                                <th className="border p-2">Mã phiếu thuê</th>
                                                                <th className="border p-2">Mã sách</th>
                                                                <th className="border p-2">Người thuê</th>
                                                                <th className="border p-2">Sdt người thuê</th>
                                                                <th className="border p-2">Đ/c người thuê</th>
                                                                <th className="border p-2">Tên sách</th>
                                                                <th className="border p-2">Số ngày thuê</th>
                                                                <th className="border p-2">Ngày nhận</th>
                                                                <th className="border p-2">Ngày trả</th>
                                                                <th className="border p-2">Tiền cọc</th>
                                                                <th className="border p-2">Tổng tiền</th>
                                                                <th className="border p-2">Người đăng</th>
                                                                <th className="border p-2">Sdt người đăng</th>
                                                                <th className="border p-2">Đ/c người đăng</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filterData.map((dataFilter, index) => (
                                                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                                                                    <td className="border p-2">{dataFilter.maphieu}</td>
                                                                    <td className="border p-2">{dataFilter.masach}</td>
                                                                    <td className="border p-2">{dataFilter.nguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.sdtnguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.diachinguoithue}</td>
                                                                    <td className="border p-2">{dataFilter.tensach}</td>
                                                                    <td className="border p-2">{dataFilter.ngaythue} ngày</td>
                                                                    <td className="border p-2">{dayjs(dataFilter.ngaynhan).format(' DD-MM-YYYY')}</td>
                                                                    <td className="border p-2">{dayjs(dataFilter.ngaynhan).format(' DD-MM-YYYY')}</td>
                                                                    <td className="border p-2">{formatCurrency(dataFilter.tiencoc)}vnđ</td>
                                                                    <td className="border p-2">{formatCurrency(dataFilter.tongtien)}vnđ</td>
                                                                    <td className="border p-2">{dataFilter.nguoidang}</td>
                                                                    <td className="border p-2">{dataFilter.sdtnguoidang}</td>
                                                                    <td className="border p-2">{dataFilter.diachinguoidang}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                </div>
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={handleCloseChange}
                                                    >
                                                        Đóng
                                                    </button>
                                                    <button
                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={handlePrint}
                                                    >
                                                        In
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null}
                        </>
                    );
                case 'Hoàn thành':
                    return (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">STT</th>
                                            <th className="py-2 px-4 border-b">Tên sách</th>
                                            <th className="py-2 px-4 border-b">Người thuê</th>
                                            <th className="py-2 px-4 border-b">Người đăng</th>
                                            <th className="py-2 px-4 border-b">Mã phiếu</th>
                                            <th className="py-2 px-4 border-b">Địa chỉ người đăng</th>
                                            <th className="py-2 px-4 border-b">Địa chỉ người thuê</th>
                                            <th className="py-2 px-4 border-b">SDT người đăng</th>
                                            <th className="py-2 px-4 border-b">SDT người Thuê</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {complete1 && complete1.length > 0 &&
                                            complete1.map((item, index) => (
                                                <tr key={index} className={`${index % 2 === 0 ? 'hover:bg-gray-100' : 'hover:bg-gray-200'
                                                    } hover:bg-gray-300`}>
                                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                                    <td className="py-2 px-4 border-b">{item.tensach}</td>
                                                    <td className="py-2 px-4 border-b">{item.nguoithue}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.nguoidang}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.maphieu}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.diachinguoidang}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.diachinguoithue}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.sdtnguoidang}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.sdtnguoithue}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    );
                case 'Đã hủy':
                    return (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">STT</th>
                                            <th className="py-2 px-4 border-b">Tên sách</th>
                                            <th className="py-2 px-4 border-b">Người thuê</th>
                                            <th className="py-2 px-4 border-b">Người đăng</th>
                                            <th className="py-2 px-4 border-b">Mã phiếu</th>
                                            <th className="py-2 px-4 border-b">Địa chỉ người đăng</th>
                                            <th className="py-2 px-4 border-b">Địa chỉ người thuê</th>
                                            <th className="py-2 px-4 border-b">SDT người đăng</th>
                                            <th className="py-2 px-4 border-b">SDT người Thuê</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {huyDon && huyDon.length > 0 &&
                                            huyDon.map((item, index) => (
                                                <tr key={index} className={`${index % 2 === 0 ? 'hover:bg-gray-100' : 'hover:bg-gray-200'
                                                    } hover:bg-gray-300`}>
                                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                                    <td className="py-2 px-4 border-b">{item.tensach}</td>
                                                    <td className="py-2 px-4 border-b">{item.nguoithue}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.nguoidang}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.maphieu}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.diachinguoidang}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.diachinguoithue}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.sdtnguoidang}</td>
                                                    <td className="py-2 px-4 border-b text-orange-600">{item.sdtnguoithue}</td>
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
                    {['Xác nhận', 'Chờ nhận', 'Đang thuê', 'Chờ trả', 'Hoàn thành', 'Đã hủy'].map((status) => (
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
                    {['Xác nhận', 'Chờ giao', 'Đang thuê', 'Chờ trả', 'Hoàn thành', 'Đã hủy'].map((status) => (
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
