import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_FROM_CART, REMOVE_ALL, TOGGLE_CHECKBOX } from '../app/userCard';
import { useNavigate } from 'react-router-dom';
import Avt from '../avatar-authur.png';
import axios from 'axios';
import Select from 'react-select';
import { callApiCreateRental } from '../Service/UserService';
import iziToast from 'izitoast';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';

const steps = ['Chọn sản phẩm', 'Địa chỉ giao hàng', 'Điều khoản'];
export default function CustomerCard() {
    const [checkChildren, setCheckChildren] = React.useState([]);
    const card = useSelector((state) => state.shop.cart);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [sdt, setSdt] = useState();
    const [address, setAddress] = useState();
    useEffect(() => {
        callAPI(host + "?depth=1");
        if (!userData.isLogin) {
            navigate('/');
        }
    }, [userData]);

    let chutiem_id = ''
    Object.keys(card).forEach(function (item) {
        chutiem_id = card[item].id_users;
    });

    let sach_id = Object.keys(checkChildren).flatMap(item => {
        // Kiểm tra xem thuộc tính 'id' có phải là mảng không
        return Array.isArray(checkChildren[item].id) ? { ...checkChildren[item].id } : [checkChildren[item].id];
    });

    const DeleteCart = (_value) => {
        dispatch(REMOVE_FROM_CART(_value));
    }

    const [selectedValue, setSelectedValue] = useState('7');
    let TotalCart = 0;
    let TotalCart1 = 0;
    let Total = 0;
    let SumCart = 0;
    Object.keys(card).forEach(function (item) {
        //if (checkChildren.hasOwnProperty(item)) {
        let a = checkChildren?.filter((items) => items?.id === card[item]?.id)
        if (a.length > 0) {
            const productPrice = a[0]?.gia;
            const productPrice1 = a[0]?.tiencoc;
            let increaseRate = 0;
            if (selectedValue === '7') {
                increaseRate = 0;
            } else if (selectedValue === '15') {
                increaseRate = 0.1;
            } else if (selectedValue === '30') {
                increaseRate = 0.15;
            }
            const increasedPrice = productPrice * (1 + increaseRate);
            TotalCart += Math.floor(increasedPrice);
            TotalCart1 += Math.floor(productPrice1);
            SumCart = TotalCart + TotalCart1;
            Total += productPrice;
        }
    });

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

    }, [address, selectedProvince, selectedDistrict, selectedWard]);

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
        if (address && selectedProvince && selectedDistrict && selectedWard) {
            const resultString = `${address}, ${selectedWard.label}, ${selectedDistrict.label}, ${selectedProvince.label}`;
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

    //Truyền các tham số: users_id, chutiem_id, tongtien, sach_id, diachi, ngaythue
    let users_id = userData.userInfo
    let tongtien = TotalCart1
    let diachi = result
    let ngaythue = selectedValue
    let tongtienthue = TotalCart
    const onClickXuatHoaDon = async () => {
        //|| selectedNguoiDang.length !== 1
        if (diachi === "") {
            iziToast.error({
                title: "Thiếu thông tin",
                position: "topRight",
                message: "Thiếu địa chỉ hoặc chỉ chọn một người đăng"
            });
        } else {
            let formData = {
                users_id: users_id.id,
                chutiem_id: chutiem_id,
                diachi: diachi,
                ngaythue: ngaythue,
                sach_id: sach_id,
                tongtien: tongtien,
                sdt: sdt,
                tongtienthue: tongtienthue
            }
            console.log(formData)
            //users_id, chutiem_id, tongtien, tongtienthue, sach_id, diachi, ngaythue, sdt 
            let res = await callApiCreateRental(users_id.id, chutiem_id, tongtien, tongtienthue, sach_id, diachi, ngaythue, sdt)

            if (res.status === 200) {
                iziToast.success({
                    title: res.message,
                    position: "topRight",
                    message: "Đã xác nhận đơn hàng, hãy chờ phản hồi từ chủ shop"
                });
                dispatch(REMOVE_FROM_CART(formData));
                navigate('/');
            }
            else {
                iziToast.error({
                    title: "Error!!!",
                    position: "topRight",
                    message: res.data.message
                });
            }
        }

    }

    const [nguoiDang, setNguoiDang] = useState([]);

    useEffect(() => {
        const nguoiDangList = card.map(item => item.nguoidang);
        setNguoiDang([...new Set(nguoiDangList)]); // Sử dụng Set để loại bỏ các giá trị trùng lặp
    }, [card,]);
    Object.keys(card).forEach(function (item) {
        const nguoidang = card[item].nguoidang;
    });

    const [selectedNguoiDang, setSelectedNguoiDang] = useState([]);

    const chutiem_ids = Object.values(card).map(item => item.id_users).filter(id => id);

    // Lấy danh sách tất cả các sach_id từ tất cả các sản phẩm trong giỏ hàng
    const sach_ids = Object.values(card).flatMap(item => {
        // Kiểm tra xem thuộc tính 'id' có phải là mảng không
        return Array.isArray(item.id) ? item.id : [item.id];
    });

    const groupedByNguoiDang = card.reduce((acc, data) => {
        const nguoidang = data.nguoidang;
        if (!acc[nguoidang]) {
            acc[nguoidang] = [];
        }
        acc[nguoidang].push(data);
        return acc;
    }, {});

    useEffect(() => {
        console.log("Updated SelectedNguoiDang:", selectedNguoiDang);
    }, [selectedNguoiDang]);

    const CustomListItem = ({ data, checked, onChange, onDelete }) => {


        return (
            <li className="list-item">
                <div className="flex items-center justify-between border-b p-4">
                    <Checkbox
                        checked={checked}
                        onChange={onChange}
                        color="primary"
                    />
                    <div className="thumbnail">
                        <img
                            className="w-12 h-12 rounded-full"
                            src={`http://localhost:8000/img/${data.hinh}`}
                            alt={`${data.hinh}`}
                        />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm text-gray-900 truncate">Tên sách: <strong>{data.ten}</strong></p>
                        <p className="text-sm text-gray-900 truncate">Tác giả: <strong>{data.tentacgia}</strong></p>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="text-sm  text-gray-900">Giá thuê:<strong>{data.gia} vnđ</strong> </div>
                        <div className="text-sm  text-gray-900">Giá cọc: <strong>{data.tiencoc} vnđ</strong></div>
                    </div>
                    <div className="badge badge-danger px-3 cursor-pointer" onClick={() => onDelete(data)}>
                        X
                    </div>

                </div>
            </li>
        );
    };
    const [checked, setChecked] = React.useState(false);


    const [dataTacGia, setDataTacGia] = React.useState([])
    const [boolean1, setBoolean1] = React.useState(true);
    const [booleanChildren, setBooleanChildren] = React.useState(true)
    const [checkLength, setCheckLength] = React.useState(false)

    const children = Object.keys(groupedByNguoiDang).map((nguoiDang, parentIndex) => {
        const parentChildren = groupedByNguoiDang[nguoiDang];

        const handleChange = (boolean1, checkLength, nguoiDang, data) => {

            setDataTacGia(nguoiDang)

            if (checkLength == false) {
                if (boolean1 == false) {
                    console.log('false')
                    setCheckChildren([])
                    setBoolean1(true)
                    setCheckLength(false)
                } else {
                    console.log('true')
                    if (dataTacGia.includes(nguoiDang)) {
                        setCheckChildren([])
                        setDataTacGia([])
                    } else {
                        setCheckChildren(data)
                        setBoolean1(false)
                        setCheckLength(true)
                    }
                }
            } else {
                if (boolean1 == true) {
                    console.log('true')
                    setCheckChildren([])
                    setBoolean1(false)
                    setCheckLength(true)
                } else {
                    console.log('false')
                    if (dataTacGia.includes(nguoiDang)) {
                        setCheckChildren([])
                        setDataTacGia([])
                    } else {
                        setCheckChildren(data)
                        setBoolean1(true)
                        setCheckLength(false)
                    }

                }
            }

        };
        function checkIdChildren(data, index) {
            let id = data?.id

            if (id == checkChildren[index]?.id) {

            }
            return data?.id == checkChildren[index]?.id
        }

        const submitChangeData = (booleanChildren, data, nguoiDang, parentChildren) => {

            // console.log(values)

            // console.log('indexw', indexw)
            if (dataTacGia.includes(nguoiDang)) {
                let values = [...checkChildren]
                let indexw = values.findIndex(_v => _v == data)
                if (indexw == -1) {
                    values.push(data)

                } else {

                    values = values.filter((_value) => _value != data)
                    if (checkChildren.length === 1) {
                        setDataTacGia([])
                    }
                }
                setCheckChildren(values)

            } else {

                let a = [...parentChildren]

                let indexw = a.findIndex(_v => _v == data)
                if (indexw == -1) {
                    console.log(data, 'data')

                    a.push(data)

                } else {
                    console.log('asdasdasd')

                    // a = a.filter((_value) => _value != data)
                }
                setDataTacGia(nguoiDang)
                setCheckChildren(a)
            }

            // console.log(values, ' checlasd')
        }

        return (
            <div key={parentIndex}>
                <FormControlLabel
                    label={nguoiDang}
                    control={
                        <Checkbox
                            checked={dataTacGia?.includes(nguoiDang)}
                            onChange={(e) => handleChange(boolean1, checkLength, nguoiDang, parentChildren)}
                        />
                    }
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                    {parentChildren && Array.isArray(parentChildren) && (
                        <ul className="item-list">
                            {parentChildren.map((data, childIndex) => (<>
                                <CustomListItem
                                    disabled={true}
                                    key={childIndex}
                                    data={data}
                                    onDelete={DeleteCart}
                                    checked={checkChildren.includes(data)}
                                    onChange={() => submitChangeData(booleanChildren, data, nguoiDang, parentChildren)}

                                // control={
                                //     <Checkbox
                                //         checked={checkIdChildren(data,childIndex)}
                                //         value={checkIdChildren(data,childIndex)}
                                //         onChange={() => submitChangeData()}
                                //     />
                                // }
                                />
                            </>))}
                        </ul>
                    )}
                </Box>
            </div>
        );
    });

    //Xử lý các bước trong giỏ hàng
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {

        if (checkChildren.length === 0) {
            dispatch(TOGGLE_CHECKBOX(checkChildren))
            iziToast.warning({
                title: "Vui lòng chọn sản phẩm!!!",
                position: 'center'
            })
            return;
        }
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Vui lòng chọn địa chỉ</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <br />
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            <div className='w-3/5 mx-auto'>
                                <div className='w-full mx-auto'>Bạn đã hoàn thành các bước nhấn xác nhận để hoản thành quá trình</div>
                                <br />
                                <div
                                    onClick={onClickXuatHoaDon}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                                    style={{ textAlign: 'center' }}
                                >
                                    Hoàn thành
                                </div></div>
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Trở về
                            </Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Bước {activeStep + 1}
                            {activeStep === 0 && (
                                <Typography>
                                    <div className="w-4/5 p-4 bg-white border border-gray-200 rounded-lg shadow mx-auto">
                                        <div className="flex items-center justify-center mb-4">
                                            <h5 className="text-xl font-bold leading-none text-gray-900 ">Giỏ hàng của bạn</h5>
                                        </div>
                                        {children}
                                        <hr className="border-gray-300" />
                                        <div className="bg-white text-black p-4 rounded-md shadow-md">
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
                                        <br />
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 px-3">
                                            Thời gian thuê là {selectedValue} ngày:
                                            {selectedValue === '7' ? '+ 5%' : selectedValue === '15' ? '+ 10%' : selectedValue === '30' ? '+ 15%' : ''} với mỗi quyển sách
                                        </div>

                                        <br />
                                        <h3 className="text-xl leading-none text-red-500 font-semibold mt-auto border-b-2 border-gray-500 pb-2" style={{ textAlign: 'right' }}>
                                            <strong>Tổng tiền:</strong> {SumCart} vnđ
                                        </h3>

                                        <br />
                                        <div>
                                            <strong>Lưu ý:</strong><span className='text-amber-500'> &nbsp;Ứng dụng chỉ cho thuê với cùng 1 chủ tiệm (người đăng)</span>
                                        </div>
                                        <br />


                                    </div>
                                </Typography>
                            )}
                            {activeStep === 1 && (
                                <Typography>
                                    <div className="w-4/5 p-4 bg-white border border-gray-200 rounded-lg shadow mx-auto">
                                        <div className="mb-4">
                                            <h5 className="text-xl font-bold leading-none text-gray-900">Thông tin cá nhân</h5>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <div className='w-2/5 flex'>
                                                <div className="flex-shrink-0">
                                                    <img className="w-8 h-8 rounded-full" src={Avt} alt={`${userData?.hinh}`} />
                                                    {/* {`http://localhost:8000/img/${userData.hinh}`} */}
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">{userData?.userInfo?.ten}</p>
                                                    <p className="text-sm text-gray-900">{userData?.userInfo?.email}</p>
                                                    <p className="text-sm text-gray-900">{userData?.userInfo?.sdt}</p>
                                                </div>
                                            </div>
                                            <div className="w-3/5">
                                                <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
                                                    <TextField id="outlined-basic" label="Số điện thoại" variant="outlined"
                                                        value={sdt}
                                                        onChange={(event) => { setSdt(event.target.value) }} />
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
                                                    <TextField id="outlined-basic" label="Địa chỉ" variant="outlined"
                                                        value={address}
                                                        onChange={(event) => { setAddress(event.target.value) }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Typography>
                            )}
                            {activeStep === 2 && (
                                <Typography>
                                    <div className='w-full'>
                                        <div className='w-4/5 mx-auto shadow-lg p-4 bg-amber-50'>
                                            - Tiệm có 3 mức thuê cố định là: 7 ngày, 15 ngày và 30 ngày. <br />
                                            - Khi người thuê muốn trả sách sớm trước ngày dự kiến trả. Thì giá thuê không thay đổi.<br />
                                            - Khi người thuê trả sách sớm hay trả đúng dự kiến thì vẫn tất cả sách có trong phiếu thuê.<br />
                                            - Nếu có hư hỏng trong quá trình thuê, phí phát sinh sẽ được thỏa thuận giữa người cho thuê với người thuê
                                            và sẽ được trừ vào tiền cọc. <br />
                                            - Phương thức thanh toán tiền thuê với tiền cọc sẽ do người cho thuê và người thuê tự trao đổi.<br />
                                            - Hình thức giao nhận do người cho thuê và người thuê tự trao đổi.<br />
                                            - Nếu người thuê không nhận hàng thì sẽ bị cấm thuê sách tại Thuê sách Online.<br />
                                            - Nếu người thuê nhận hàng không đúng với sản phẩm trên phiếu thuê thì có thể quay video hoặc chụp hình lại và <Link to='/blogs'>liên hệ</Link> với Thuê sách Online.
                                        </div>
                                    </div>
                                </Typography>
                            )}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Trở về
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Kết thúc' : 'Tiếp'}

                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </>
    )
}