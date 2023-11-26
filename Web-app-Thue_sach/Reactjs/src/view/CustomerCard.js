import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_FROM_CART } from '../app/userCard';
import { useNavigate } from 'react-router-dom';
import Avt from '../avatar-authur.png';
import axios from 'axios';
import Select from 'react-select';
import { callApiCreateRental } from '../Service/UserService';
import iziToast from 'izitoast';
export default function CustomerCard() {

    const card = useSelector((state) => state.shop.cart);

    const userData = useSelector((state) => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        callAPI(host + "?depth=1");
        if (!userData.isLogin) {
            navigate('/');
        }
    }, [userData]);


    let TotalCart = 0;

    Object.keys(card).forEach(function (item) {
        TotalCart += card[item].gia;
    });

    console.log(">>>check card: ", card)
    let chutiem_id = ''
    Object.keys(card).forEach(function (item) {
        chutiem_id = card[item].id_users;
    });
    console.log(">>>check chutiem_id: ", chutiem_id)


    let sach_id = Object.keys(card).flatMap(item => {
        // Kiểm tra xem thuộc tính 'id' có phải là mảng không
        return Array.isArray(card[item].id) ? { ...card[item].id } : [card[item].id];
    });
    console.log(">>>check sach_id: ", sach_id)

    const dispatch = useDispatch();

    const DeleteCart = (_value) => {
        dispatch(REMOVE_FROM_CART(_value));
    }

    const [selectedValue, setSelectedValue] = useState('7');

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
    };

    //xử lí location 
    const host = "https://provinces.open-api.vn/api/";

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const [result, setResult] = useState('');

    useEffect(() => {
        // Hàm này sẽ được gọi mỗi khi có sự thay đổi ở selectedProvince, selectedDistrict, hoặc selectedWard
        printResult();
    }, [selectedProvince, selectedDistrict, selectedWard]);

    const callAPI = (api) => {
        axios.get(api)
            .then((response) => {
                setProvinces(response.data);
            })
            .catch((error) => {
                console.error("Error fetching provinces:", error);
            });
    }

    const callApiDistrict = (provinceCode) => {
        const api = host + `p/${provinceCode}?depth=2`;
        axios.get(api)
            .then((response) => {
                setDistricts(response.data.districts);
            })
            .catch((error) => {
                console.error("Error fetching districts:", error);
            });
    }

    const callApiWard = (districtCode) => {
        const api = host + `d/${districtCode}?depth=2`;
        axios.get(api)
            .then((response) => {
                setWards(response.data.wards);
            })
            .catch((error) => {
                console.error("Error fetching wards:", error);
            });
    }

    const printResult = () => {
        if (selectedProvince && selectedDistrict && selectedWard) {
            const resultString = `${selectedProvince.label} | ${selectedDistrict.label} | ${selectedWard.label}`;
            setResult(resultString);
        }
    }

    const handleProvinceChange = (selectedOption) => {
        setSelectedProvince(selectedOption);
        callApiDistrict(selectedOption.value);
        printResult();
    }

    const handleDistrictChange = (selectedOption) => {
        setSelectedDistrict(selectedOption);
        callApiWard(selectedOption.value);
        printResult();
    }

    const handleWardChange = (selectedOption) => {
        setSelectedWard(selectedOption);
        printResult();
    }

    console.log(result)
    //Truyền các tham số: users_id, chutiem_id, tongtien, sach_id, diachi, ngaythue
    let users_id = userData.userInfo.id
    console.log(users_id)
    let tongtien = TotalCart
    console.log(tongtien)
    let diachi = result
    console.log(diachi)
    let ngaythue = selectedValue
    console.log(ngaythue)

    const onClickXuatHoaDon = async () => {
        if (diachi === "") {
            iziToast.error({
                title: "Thiếu thông tin",
                position: "topRight",
                message: "Thiếu địa chỉ rồi"
            });
        } else {
            let res = await callApiCreateRental(users_id, chutiem_id, tongtien, sach_id, diachi, ngaythue)
            if (res.status === 200) {
                iziToast.success({
                    title: res.message,
                    position: "topRight",
                    message: "Đã xác nhận đơn hàng, hãy chờ phản hồi từ chủ shop"
                });
            }
            else {
                iziToast.error({
                    title: "Sách của bạn đã được thuê",
                    position: "topRight",
                    message: "Quay lại khi có sách nhé!!"
                });
            }
        }

    }
    //console.log(">>check address: ", result)
    return (
        <>
            <div className="w-full flex flex-col md:flex-row gap-2">
                <div className="w-full md:w-3/5 p-4 bg-white border border-gray-200 rounded-lg shadow ">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900 ">Giỏ hàng của bạn</h5>

                    </div>
                    {card.map((value, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className="flow-root">
                                    <ul role="list" className="divide-y divide-gray-200 ">
                                        <li className="py-3 sm:py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <img className="w-8 h-8 rounded-full" src={`http://localhost:8000/img/${value.hinh}`}
                                                        alt={`${value.hinh}`} />
                                                </div>
                                                <div className="flex-1 min-w-0 ms-4">
                                                    <p className="text-sm font-medium text-gray-900 truncate ">
                                                        {value.ten}
                                                    </p>
                                                    <p className="text-sm text-gray-900 truncate">
                                                        {value.tentacgia}
                                                    </p>
                                                </div>
                                                <div>
                                                    <div className="block items-center text-base font-semibold text-gray-900 px-3">
                                                        Giá thuê:{value.gia} vnđ
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 px-3">
                                                        Giá cọc:{value.tiencoc} vnđ
                                                    </div>
                                                </div>

                                                <i className="badge badge-danger px-3 cursor-pointer" onClick={(e) => DeleteCart(value)}>X</i>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </React.Fragment>
                        )
                    })}
                    <br />
                    <h3 className="text-xl leading-none text-red-500 font-semibold mt-auto border-b-2 border-gray-500 pb-2" style={{ textAlign: 'right' }}>
                        <strong>Tổng tiền:</strong> {TotalCart} vnđ
                    </h3>
                    <br />
                    <div>
                        <strong>Lưu ý:</strong><span className='text-amber-500'> &nbsp;Ứng dụng chỉ cho thuê với cùng 1 chủ tiệm (người đăng)</span>
                    </div>
                    <br />
                    <div
                        onClick={onClickXuatHoaDon}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                        style={{ textAlign: 'center' }}
                    >
                        Xác nhận
                    </div>
                </div>

                <div className="w-full md:w-2/5 p-4 bg-white border border-gray-200 rounded-lg shadow">
                    <div className="mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900">Thông tin cá nhân</h5>
                    </div>

                    <div className="flex items-center mb-4">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src={Avt} alt={`${userData.hinh}`} />
                            {/* {`http://localhost:8000/img/${userData.hinh}`} */}
                        </div>

                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{userData.userInfo.ten}</p>
                            <p className="text-sm text-gray-900">{userData.userInfo.email}</p>
                            <p className="text-sm text-gray-900">{/* Thêm số điện thoại ở đây */} 0367431233</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
                            <label className="block mb-2">
                                Tỉnh/Thành phố:
                                <Select
                                    placeholder="Chọn tỉnh/thành phố"
                                    value={selectedProvince}
                                    onChange={handleProvinceChange}
                                    options={provinces.map(province => ({ value: province.code, label: province.name }))}
                                />
                            </label>

                            <label className="block mb-2">
                                Quận/Huyện:
                                <Select
                                    placeholder="Chọn quận/huyện"
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                    options={districts.map(district => ({ value: district.code, label: district.name }))}
                                />
                            </label>

                            <label className="block mb-2">
                                Phường/Xã:
                                <Select
                                    placeholder='Chọn phường/xã'
                                    value={selectedWard}
                                    onChange={handleWardChange}
                                    options={wards.map(ward => ({ value: ward.code, label: ward.name }))}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Thêm khoảng trắng giữa các phần nếu cần */}
                    <hr className="border-gray-300" />
                    <div className="bg-blue-500 text-black p-4 rounded-md shadow-md">
                        <label className="text-lg font-bold">Chọn khoảng thời gian:</label>
                        <select
                            className="p-2 border rounded-md mt-2"
                            value={selectedValue}
                            onChange={handleSelectChange}
                        >
                            <option value="7">7 ngày</option>
                            <option value="15">15 ngày</option>
                            <option value="30">30 ngày</option>
                        </select>
                    </div>
                </div>

            </div>
        </>
    )
}
