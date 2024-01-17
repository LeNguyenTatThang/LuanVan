import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { apiListBook, apiListCate, apiRating, callApiSearch } from '../Service/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART } from '../app/userCard';
import { Link, useNavigate } from 'react-router-dom';
import iziToast from 'izitoast';
import Select from 'react-select';
import LazyLoad from 'react-lazyload';
import { Rating, Stack } from '@mui/material';

export default function Product() {
    const apiUrl = 'http://localhost:8000';
    //const apiUrl = 'https://thuesachadmin.onrender.com/';
    const card = useSelector((state) => state.shop.cart);
    const login = useSelector((state) => state.user);
    const [listBook, setListBook] = useState();
    const [totalPage, setTotalPage] = useState();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.shop.card);
    const navigate = useNavigate();
    const [ten, setTen] = useState(null);
    const [category, setCategory] = useState();
    const [theloai_id, setTheloai_id] = useState('');
    const [dataSearch, setDataSearch] = useState();
    const [status, setStatus] = useState('');
    const loai = status?.value;
    useEffect(() => {
        getListBook();
        getCategory();
        apiSearch();
    }, [ten, loai, theloai_id])

    const getListBook = async (page) => {
        let res = await apiListBook(page);
        if (res && res.data) {
            setListBook(res.data);
            setTotalPage(res.totalPage)
        }
    }

    const handlePageClick = (event) => {
        getListBook(+event.selected + 1);

    }

    const handleAdd = (_item) => {
        // var item = { ...userData };
        if (!login.isLogin) {
            iziToast.warning({
                title: "Vui lòng đăng nhập!",
                position: "center",
                buttons: [
                    ['<button>Tới trang đăng nhập</button>', function (instance, toast) {
                        navigate('/signin');
                    }, true], // true to focus
                    ['<button>Ở lại trang</button>', function (instance, toast) {
                        instance.hide({
                            transitionOut: 'fadeOutUp',
                            onClosing: function (instance, toast, closedBy) {
                                console.info('closedBy: ' + closedBy); // The return will be: 'closedBy: buttonName'
                            }
                        }, toast, 'buttonName');
                    }]
                ],
                onOpening: function (instance, toast) {
                    console.info('callback abriu!');
                },
                onClosing: function (instance, toast, closedBy) {
                    console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
                }
            });

        } else {
            if (login.userInfo.ten === _item.nguoidang) {
                iziToast.warning({
                    title: "Không thể thuê sản phẩm của bạn!",
                    position: "center",
                })
                return;
            } else {
                dispatch(ADD_TO_CART(_item));
            }

        }
    }
    const handleSearch = async (event) => {
        const inputValue = event.target.value;
        setTen(inputValue);
        try {
            let res = await callApiSearch(ten, loai, theloai_id);

            if (res && res.data) {
                setDataSearch(res.data);
            } else {
                console.error('API response does not contain data.');
            }
        } catch (error) {
            console.error('Error calling the API:', error);
            // Handle the error as needed
        }
    }
    const apiSearch = async () => {
        let res = await callApiSearch(ten, loai, theloai_id);

        if (res && res.data) {
            setDataSearch(res.data);
        } else {
            console.error('API response does not contain data.');
        }
    }

    const getCategory = async () => {
        let cate = await apiListCate(ten, loai, theloai_id);
        if (cate && cate.data && cate.status) {
            setCategory(cate.data)
        }
    }
    const handleChangeCate = async (e) => {
        setTheloai_id(e.value);
        try {
            if (theloai_id === '') {
                return;
            }
            let data = await callApiSearch(ten, loai, theloai_id);

            if (data && data.data) {
                setDataSearch(data.data);
            } else {
                console.error('API response does not contain data.');
            }
        } catch (error) {
            console.error('Error calling the API:', error);
            // Handle the error as needed
        }
    }

    const handleChangeStatus = async (selectedOption) => {
        setStatus(selectedOption);
        try {
            if (loai === '') {
                return;
            }
            let res = await callApiSearch(ten, loai, theloai_id);

            if (res && res.data) {
                setDataSearch(res.data);
            } else {
                console.error('API response does not contain data.');
            }
        } catch (error) {
            console.error('Error calling the API:', error);
            // Handle the error as needed
        }
    }

    const array = [
        { label: 'Tất cả', value: '' },
        ...(category?.map((res) => ({ label: res.ten, value: res.id })) || [])
    ]

    const options = [
        { value: '', label: 'Tất cả' },
        { value: 1, label: 'Sách đọc' },
        { value: 0, label: 'Sách thuê' },
    ]

    return (
        <>

            <div className="p-2 flex gap-3 justify-center">
                <Select
                    placeholder='Đọc và thuê'
                    className='w-44'
                    value={status}
                    onChange={handleChangeStatus}
                    options={options}
                />
                <Select
                    placeholder="Tất cả thể loại"
                    options={array}
                    className='w-44'
                    onChange={(e) => {
                        handleChangeCate(e)
                    }}
                />
                <div className="flex items-center w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Nhập tên sách hoặc tên tác giả"
                        className="flex-1 px-4 py-2 rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:border-blue-500"
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <br /><br />
            {ten === null && status === '' && theloai_id === '' ? <>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-11/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {listBook && listBook.length > 0 &&
                            listBook.map((item, idex) => {
                                return (
                                    <>
                                        <div className="rounded overflow-hidden shadow-lg flex flex-col" key={idex}>
                                            <div className="relative">
                                                <LazyLoad height={200} offset={100}>
                                                    <img
                                                        className="w-3/5 mx-auto h-56 object-cover border border-gray-200 shadow-md transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                                                        src={`${apiUrl}/img/${item.hinh}`}
                                                        alt={`${item.hinh}`}
                                                    />
                                                </LazyLoad>
                                                <div
                                                    className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                                                </div>
                                                {item.trangthaithue === 'dangthue' ? <><div className="rounded-full text-xs absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 px-4 py-2 text-white hover:bg-orange-600 transition duration-500 ease-in-out">
                                                    Sách đang được thuê
                                                </div>
                                                </> : <>
                                                    <div
                                                        className="rounded-full text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-orange-600  transition duration-500 ease-in-out">
                                                        {item.loai === 0 ? (
                                                            <>
                                                                {card.some((product) => product.id === item.id) && login?.userInfo?.id ? (
                                                                    <div className="text-green-500">Đã thêm</div>
                                                                ) : (
                                                                    <div className="cursor-pointer" onClick={(e) => handleAdd(item)}>
                                                                        Thuê
                                                                    </div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <><Link to={`/detail-book/${item.id}`} >
                                                                <div className="cursor-pointer">Đọc</div></Link>
                                                            </>
                                                        )}
                                                    </div></>
                                                }
                                            </div>

                                            <div className="py-2 w-full">
                                                <Link to={`/detail-book/${item.id}`} >
                                                    <div className="px-4 mx-auto ">

                                                        <div className=" cursor-pointer mb-2">
                                                            <span className='uppercase hover:text-slate-500 font-medium text-lg transition duration-500'>{item.ten}</span>
                                                        </div>

                                                    </div>
                                                    {item.loai === 0 ? <>
                                                        <div className="flex gap-2 w-full justify-around">
                                                            <div className="text-sm hover:text-slate-500"><strong>Tiền cọc:</strong> <span className='text-red-500 font-bold'>{item.tiencoc}</span> vnđ</div>
                                                            <div className="text-sm hover:text-slate-500"><strong>Giá:</strong> <span className='text-red-500 font-bold'>{item.gia}</span> vnđ</div>

                                                        </div>
                                                    </> : <>
                                                    </>}
                                                </Link>
                                                <div className="flex flex-col gap-2 items-center justify-center">
                                                    <Rating name="size-large" value={item.danhgia} size="small" readOnly />
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                )
                            })}
                    </div>
                </div>
                <br />
                <ReactPaginate
                    className='flex justify-center'
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={totalPage}
                    previousLabel="< previous"
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    containerClassName='pagination'
                    activeClassName='active'
                />
            </>
                : <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {dataSearch && dataSearch.length > 0 &&
                            dataSearch.map((item, idex) => {
                                return (
                                    <>
                                        <div className="rounded overflow-hidden shadow-lg flex flex-col" key={idex}>
                                            <div className="relative">
                                                <LazyLoad height={200} offset={100}>
                                                    <img
                                                        className="w-3/5 mx-auto h-56 object-cover border border-gray-200 shadow-md transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                                                        src={`${apiUrl}/img/${item.hinh}`}
                                                        alt={`${item.hinh}`}
                                                    />
                                                </LazyLoad>
                                                <div
                                                    className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                                                </div>
                                                {item.trangthaithue === 'dangthue' ? <><div className="rounded-full text-xs absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 px-4 py-2 text-white hover:bg-orange-600 transition duration-500 ease-in-out">
                                                    Sách đang được thuê
                                                </div>
                                                </> : <>
                                                    <div
                                                        className="rounded-full text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-orange-600  transition duration-500 ease-in-out">
                                                        {item.loai === 0 ? (
                                                            <>
                                                                {card.some((product) => product.id === item.id) && login?.userInfo?.id ? (
                                                                    <div className="text-green-500">Đã thêm</div>
                                                                ) : (
                                                                    <div className="cursor-pointer" onClick={(e) => handleAdd(item)}>
                                                                        Thuê
                                                                    </div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="cursor-pointer">Đọc</div>
                                                            </>
                                                        )}
                                                    </div></>
                                                }
                                            </div>

                                            <div className="py-2 w-full">
                                                <Link to={`/detail-book/${item.id}`} >
                                                    <div className="px-4 mx-auto ">

                                                        <div className=" cursor-pointer mb-2">
                                                            <span className='uppercase hover:text-slate-500 font-medium text-lg transition duration-500'>{item.ten}</span>
                                                        </div>

                                                    </div>
                                                    {item.loai === 0 ? <>
                                                        <div className="flex gap-2 w-full justify-around">
                                                            <div className="text-sm hover:text-slate-500"><strong>Tiền cọc:</strong> <span className='text-red-500 font-bold'>{item.tiencoc}</span> vnđ</div>
                                                            <div className="text-sm hover:text-slate-500"><strong>Giá:</strong> <span className='text-red-500 font-bold'>{item.gia}</span> vnđ</div>

                                                        </div>
                                                    </> : <>
                                                    </>}
                                                </Link>
                                                <div className="flex flex-col gap-2 items-center justify-center">
                                                    <Rating name="size-large" defaultValue={item.danhgia} size="small" />
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                )
                            })}
                    </div>
                </>

            }
        </>
    )
}
