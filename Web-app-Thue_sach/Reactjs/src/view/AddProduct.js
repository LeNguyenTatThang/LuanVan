import iziToast from 'izitoast';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { addBook, apiListCate } from '../Service/UserService';
import Select from 'react-select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Input } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
export default function AddProduct() {

    const navigate = useNavigate();

    const [book, setBook] = useState(0);

    const handleRead = (e) => {
        setBook(e.target.value);
    }

    const handleRead1 = async (e) => {
        let value = e.target.value
        let formData = { loai: value }
        setBook(formData)
    }

    const [ten, setTen] = useState();
    const [hinh, setHinh] = useState({ preview: '', data: '' });
    const [tinhtrang, setTinhTrang] = useState();
    const [gia, setGia] = useState();
    const [tiencoc, setTiencoc] = useState();
    const [tentacgia, setTentacgia] = useState();
    const [theloai_id, setTheloai_id] = useState(1);
    const [id_users, setId_user] = useState()
    const userData = useSelector((state) => state.user);
    const [category, setCategory] = useState();
    const [noidung, setNoidung] = useState('');

    const handleContentChange = (e) => {
        setNoidung(e.target.value);
    };
    useEffect(() => {
        if (!userData.isLogin) {
            navigate(-1);
        }
        if (userData.isLogin) {
            setId_user(userData.userInfo.id)
        }
        getCategory();

    }, [])

    const dispatch = useDispatch();
    const handleChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const img = {
                preview: URL.createObjectURL(selectedFile),
                data: selectedFile,
            };
            setHinh(img);

        }
    };


    const getCategory = async () => {
        let cate = await apiListCate();
        if (cate && cate.data && cate.status) {
            setCategory(cate.data)
        }
    }

    const handleSend = async (e) => {
        e.preventDefault();
        if (!ten || !hinh.data || !tentacgia || !noidung) {
            iziToast.error({
                title: "Opzzz!!",
                position: "topRight",
                message: "Vui lòng không để trống"
            });
        }
        if (book === '') {
            iziToast.info({
                title: "Opzzz!!",
                position: "topRight",
                message: "Hãy chọn loại sách đăng"
            });
        }
        //thêm các thuộc tính                hinh, ten, tinhtrang,loai, theloai_id, gia, tiencoc, tentacgia, id_users

        let res = await addBook(hinh.data, ten, tinhtrang?.value, book, theloai_id, gia, tiencoc, tentacgia, id_users, noidung);
        if (res && res.status === 200) {
            iziToast.success({
                title: "Succes",
                position: "topRight",
                message: res.message
            });
            window.location.reload();
            setTentacgia('');
            setTen('');
            setHinh({ preview: '', data: '' });
            setTinhTrang('');
            setGia('');
            setNoidung('');
            setTiencoc('');
            setTheloai_id('');
        } else {
            iziToast.error({
                title: "Opzz!",
                position: "topRight",
                message: res.data.message
            });
        }


    }

    const array = Array.isArray(category)
        ? category.map((res) => ({
            label: res.ten,
            value: res.id
        }))
        : [];

    const handleChangeCate = (e) => {
        setTheloai_id(e.value)
    }

    const options = [
        { value: 1, label: 'Sách cũ' },
        { value: 0, label: 'Sách mới' },
    ];

    const handleChangeTinhTrang = (selectedOption) => {
        setTinhTrang(selectedOption);
    };
    return (
        <div>
            <section className="bg-gray-50 ">


                <div className="w-full bg-white rounded-lg shadow py-4">
                    <div className="w-4/5 mx-auto">
                        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                            Thêm sách mới
                        </div>
                        <div className="space-y-4 md:space-y-6">
                            <Grid container spacing={2}>
                                <Grid xs={6}>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '40ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField id="outlined-basic" label="Tên sách" variant="outlined"
                                            value={ten}
                                            onChange={(event) => { setTen(event.target.value) }} />
                                        <br /><br />
                                        <select
                                            value={book}
                                            onChange={(e) => setBook(Number(e.target.value))}
                                            className="bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        >
                                            <option value={0}>Sách cho thuê</option>
                                            <option value={1}>Sách đọc miễn phí</option>
                                        </select>
                                        <br />
                                        <Select
                                            placeholder="Chọn thể loại"
                                            options={array}

                                            onChange={(e) => {
                                                handleChangeCate(e)
                                            }}
                                        />
                                        <br />
                                        {book === 0 ?
                                            <>
                                                <div>
                                                    <label>Tình trạng sách:</label>
                                                    {JSON.stringify(tinhtrang)}
                                                    <Select
                                                        placeholder='Tình trạng sách'
                                                        value={tinhtrang}
                                                        onChange={handleChangeTinhTrang}
                                                        options={options}
                                                    />
                                                    {tinhtrang && (
                                                        <p>Bạn đã chọn: {tinhtrang.label}</p>
                                                    )}
                                                </div>
                                                <br />
                                                <div>
                                                    <TextField id="outlined-basic" label="Giá" variant="outlined"
                                                        type="number" name="gia" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required=""
                                                        value={gia}
                                                        onChange={(event) => {
                                                            if (event && event.target && event.target.value !== undefined) {
                                                                const inputValue = event.target.value;
                                                                if (/^\d+$/.test(inputValue)) {
                                                                    setGia(event.target.value);
                                                                } else {
                                                                    iziToast.error({
                                                                        title: "Wrong!!",
                                                                        position: "topRight",
                                                                        message: "Vui lòng không nhập số âm"
                                                                    });
                                                                }
                                                            }
                                                        }} />
                                                </div>
                                                <br />
                                                <div>
                                                    <TextField id="outlined-basic" label="Tiền cọc" variant="outlined"
                                                        type="number"
                                                        name="tiencoc"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                        required=""
                                                        value={tiencoc}
                                                        onChange={(event) => {
                                                            // Ensure event.target and event.target.value are defined
                                                            if (event && event.target && event.target.value !== undefined) {
                                                                const inputValue = event.target.value;
                                                                if (/^\d+$/.test(inputValue)) {
                                                                    setTiencoc(inputValue);
                                                                } else {
                                                                    iziToast.error({
                                                                        title: "Wrong!!",
                                                                        position: "topRight",
                                                                        message: "Vui lòng không nhập số âm"
                                                                    });
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>


                                            </>
                                            :
                                            <>


                                            </>
                                        }
                                    </Box>
                                </Grid>
                                <Grid xs={6}>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: 'full' },
                                        }}
                                        noValidate
                                        autoComplete="off">
                                        <div>
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="contained-button-file"
                                                type="file"
                                                onChange={handleChange}
                                            />
                                            <br />
                                            <label htmlFor="contained-button-file">
                                                <Button
                                                    component="span"
                                                    variant="contained"
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Thêm hình ảnh
                                                </Button>
                                            </label>
                                            <br />
                                            {hinh.preview && <img src={hinh.preview} alt="Preview" />}
                                        </div>
                                        <br />
                                        <div>
                                            <TextField id="outlined-basic" label="Tên tác giả" variant="outlined"
                                                type="text" name="tentacgia" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required=""
                                                value={tentacgia}
                                                onChange={(event) => { setTentacgia(event.target.value) }} />
                                        </div>
                                        <br />
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Nội dung:</label>
                                            <textarea type="text" name="tentacgia" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required=""
                                                value={noidung}
                                                onChange={handleContentChange}
                                            />
                                        </div>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Button variant="contained" endIcon={<SendIcon />} onClick={(e) => handleSend(e)}>
                                Đăng sách
                            </Button>
                            <br />
                        </div>
                    </div>
                </div>

            </section>

        </div>
    )
}
