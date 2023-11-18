import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { apiListBook } from '../Service/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART } from '../app/userCard';


export default function Product() {
    const [listBook, setListBook] = useState();
    const [totalPage, setTotalPage] = useState();
    const dispatch = useDispatch()
    useEffect(() => {
        getListBook();
    }, [])
    const getListBook = async (page) => {
        let res = await apiListBook(page);
        if (res && res.data) {
            setListBook(res.data);
            setTotalPage(res.totalPage)
        }

        console.log(">>>>>>check res", res)
    }

    const handlePageClick = (event) => {
        getListBook(+event.selected + 1);

    }
    const userData = useSelector((state) => state.shop.product);
    console.log(userData)
    const handleAdd = (_item) => {
        // var item = { ...userData };
        // dispatch(ADD_TO_CART(_item.id));
    }
    return (
        <>
            <select className="select w-auto h-10">
                <option disabled selected>Pick your favorite Simpson</option>
                <option>Homer</option>
                <option>Marge</option>
                <option>Bart</option>
                <option>Lisa</option>
                <option>Maggie</option>
            </select>
            <br /><br />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {listBook && listBook.length > 0 &&
                    listBook.map((item, idex) => {
                        return (
                            <>
                                <div className="rounded overflow-hidden shadow-lg flex flex-col">
                                    <div className="relative">
                                        <img className="w-full h-56"
                                            src={`http://localhost:8000/img/${item.hinh}`}
                                            alt={`${item.hinh}`} />
                                        <div
                                            className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                                        </div>
                                        <div
                                            className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-orange-600  transition duration-500 ease-in-out">
                                            {item.loai === 0 ? <><div className='cursor-pointer' onClick={(e) => handleAdd(item)}>Thuê</div></> : <><div className='cursor-pointer'>Đọc</div></>}
                                        </div>
                                    </div>
                                    <div className="py-2 mb-auto">
                                        <div className="px-6 flex flex-row items-center justify-between">
                                            <div className="font-medium text-lg cursor-pointer hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                                                <span>{item.ten}</span>
                                            </div>
                                        </div>
                                        <div className='px-4 py-2'><span className="text-xs">Người đăng: <span className='text-lime-600 text-sm'>{item.nguoidang}</span></span></div>
                                        <p className="text-gray-500 text-sm px-4">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        </p>
                                    </div>
                                    <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                                        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                                            <svg height="13px" width="13px" version="1.1" id="Layer_1"
                                                xmlns="http://www.w3.org/2000/svg" x="0px"
                                                y="0px" viewBox="0 0 512 512">
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                                                        </path>
                                                    </g>
                                                </g>
                                            </svg>
                                            <span className="ml-1">6 mins ago</span>
                                        </span>
                                        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                                            <svg className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                                                </path>
                                            </svg>
                                            <span className="ml-1">39 Comments</span>
                                        </span>
                                    </div>
                                </div>
                            </>
                        )
                    })}
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
    )
}
