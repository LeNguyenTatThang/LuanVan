import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { apiAuthurRandom, apiRandomBook } from '../Service/UserService';
import avtAuthur from '../avatar-authur.png';

export default function HomePage() {

    const [authur, setAuthur] = useState([]);
    const [randomBook, setRandomBook] = useState([]);
    const checkArray = authur?.length > 0 ? authur[0].id : null;
    const getAuthor = async () => {
        try {
            let res = await apiAuthurRandom(checkArray);
            setAuthur(res.data);
        } catch (error) {
            console.error('Error fetching author:', error);
        }
    };

    const getRandomBook = async (authorId) => {
        try {
            let data = await apiRandomBook(authorId);
            setRandomBook(data.data);
        } catch (error) {
            console.error('Error fetching random book:', error);
        }
    };
    console.log("check random book>>>>", randomBook)
    useEffect(() => {
        getAuthor();
    }, []);

    useEffect(() => {
        if (authur.length > 0) {
            const authorId = authur[0].id;
            getRandomBook(authorId);
        }
    }, [authur]);

    return (
        <>
            <Swiper
                spaceBetween={50}
                loop={true}
                speed={1500}
                modules={[Autoplay]}
                autoplay={{
                    delay: 2500,
                }}
                slidesPerView={'auto'}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide> <img src='https://images2.alphacoders.com/261/26102.jpg' className="w-full h-80 object-cover" /></SwiperSlide>
                <SwiperSlide> <img src='https://wallpapers.com/images/hd/books-and-diary-ebgaadbddzeidaaz.jpg' className="w-full h-80 object-cover" /></SwiperSlide>
                <SwiperSlide> <img src='https://wallpapers.com/images/hd/book-background-g59mnlmh8pq7359e.jpg' className="w-full h-80 object-cover" /></SwiperSlide>
                <SwiperSlide> <img src='https://wallpapersmug.com/download/3840x2160/f12332/books.jpg' className="w-full h-80 object-cover" /></SwiperSlide>
            </Swiper>

            <div className="max-w-screen-xl mx-auto p-2 sm:p-10 md:p-4">
                <div className="border-b mb-5 flex justify-between text-sm">

                    <div className="text-orange-500 flex items-center pb-2 pr-2 border-b-2 border-gray-700 uppercase">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="h-6 mr-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                        </svg>

                        <div className="font-semibold inline-block">Tác giả nổi bật</div>
                    </div>
                    <div className='text-gray-400 hover:text-red-700'>Xem tất cả</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5">
                    {authur && authur.length > 0 &&
                        authur.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className='w-full bg-white shadow rounded border border-transparent'>
                                    <div className="w-full bg-white shadow rounded border border-transparent hover:border-blue-500 cursor-pointer">
                                        <div className='flex'>
                                            <div className="h-52 w-full checker-bg flex items-center justify-center p-2 text-gray-700">

                                                {item.hinhtacgia ? <>
                                                    <img className="w-40 h-40 px-2 bg-gray-100 rounded-full bg-cover bg-center"
                                                        src={`http://localhost:8000/img/${item.hinhtacgia}`}
                                                        alt={`${item.hinhtacgia}`} />
                                                </> : <>
                                                    <img className="w-40 h-40 px-2 bg-gray-100 rounded-full bg-cover bg-center"
                                                        src={avtAuthur}
                                                        alt="" />
                                                </>
                                                }

                                                <div className="w-full h-auto px-2">
                                                    {randomBook && randomBook.length > 0 &&
                                                        randomBook.map((data, keydata) => (
                                                            <div key={keydata}>
                                                                {item.id === data.id_tacgia ? (
                                                                    <div className='flex px-1 bg-white rounded-2 py-1'>
                                                                        <div className='col-4 pl-1'>
                                                                            <img src={`http://localhost:8000/img/${data.hinh}`} alt={data.ten} className='w-12 h-14' />
                                                                        </div>
                                                                        <div className='flex items-center py-1 px-1 justify-between w-full'>
                                                                            <div className='py-1 text-clamp-1 w-40 overflow-hidden'>{data.ten}</div>
                                                                            {data.loai === 0 ?
                                                                                <><div className='text-sm text-lime-600'>Thuê</div></> : <><div className='text-sm text-lime-600'>Đọc</div></>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </div>
                                                        ))}


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 border-t border-gray-200 h-24">
                                        <div className="text-center">
                                            <h1 className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">{item.tentacgia}</h1>
                                        </div>
                                        <p className="text-gray-400 text-sm my-1 text-center">{item.gioithieu}</p>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                </div>
            </div >

            <div className="max-w-screen-xl mx-auto p-2 pt-3 sm:p-10 md:p-4">
                <div className="border-b mb-5 flex justify-between text-sm">
                    <div className="text-orange-500 flex items-center pb-2 pr-2 border-b-2 border-gray-700 uppercase">
                        <svg className="h-6 mr-3" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 455.005 455.005"
                        >
                            <g>
                                <path d="M446.158,267.615c-5.622-3.103-12.756-2.421-19.574,1.871l-125.947,79.309c-3.505,2.208-4.557,6.838-2.35,10.343 c2.208,3.505,6.838,4.557,10.343,2.35l125.947-79.309c2.66-1.675,4.116-1.552,4.331-1.432c0.218,0.12,1.096,1.285,1.096,4.428 c0,8.449-6.271,19.809-13.42,24.311l-122.099,76.885c-6.492,4.088-12.427,5.212-16.284,3.084c-3.856-2.129-6.067-7.75-6.067-15.423 c0-19.438,13.896-44.61,30.345-54.967l139.023-87.542c2.181-1.373,3.503-3.77,3.503-6.347s-1.323-4.974-3.503-6.347L184.368,50.615 c-2.442-1.538-5.551-1.538-7.993,0L35.66,139.223C15.664,151.815,0,180.188,0,203.818v4c0,23.63,15.664,52.004,35.66,64.595 l209.292,131.791c3.505,2.207,8.136,1.154,10.343-2.35c2.207-3.505,1.155-8.136-2.35-10.343L43.653,259.72 C28.121,249.941,15,226.172,15,207.818v-4c0-18.354,13.121-42.122,28.653-51.902l136.718-86.091l253.059,159.35l-128.944,81.196 c-20.945,13.189-37.352,42.909-37.352,67.661c0,13.495,4.907,23.636,13.818,28.555c3.579,1.976,7.526,2.956,11.709,2.956 c6.231,0,12.985-2.176,19.817-6.479l122.099-76.885c11.455-7.213,20.427-23.467,20.427-37.004 C455.004,277.119,451.78,270.719,446.158,267.615z"> </path>
                                <path d="M353.664,232.676c2.492,0,4.928-1.241,6.354-3.504c2.207-3.505,1.155-8.136-2.35-10.343l-173.3-109.126 c-3.506-2.207-8.136-1.154-10.343,2.35c-2.207,3.505-1.155,8.136,2.35,10.343l173.3,109.126 C350.916,232.303,352.298,232.676,353.664,232.676z"> </path>
                                <path d="M323.68,252.58c2.497,0,4.938-1.246,6.361-3.517c2.201-3.509,1.14-8.138-2.37-10.338L254.46,192.82 c-3.511-2.202-8.139-1.139-10.338,2.37c-2.201,3.51-1.14,8.138,2.37,10.338l73.211,45.905 C320.941,252.21,322.318,252.58,323.68,252.58z"> </path>
                                <path d="M223.903,212.559c-3.513-2.194-8.14-1.124-10.334,2.39c-2.194,3.514-1.124,8.14,2.39,10.334l73.773,46.062 c1.236,0.771,2.608,1.139,3.965,1.139c2.501,0,4.947-1.251,6.369-3.529c2.194-3.514,1.124-8.14-2.39-10.334L223.903,212.559z"> </path>
                                <path d="M145.209,129.33l-62.33,39.254c-2.187,1.377-3.511,3.783-3.503,6.368s1.345,4.983,3.54,6.348l74.335,46.219 c1.213,0.754,2.586,1.131,3.96,1.131c1.417,0,2.833-0.401,4.071-1.201l16.556-10.7c3.479-2.249,4.476-6.891,2.228-10.37 c-2.248-3.479-6.891-4.475-10.37-2.228l-12.562,8.119l-60.119-37.38l48.2-30.355l59.244,37.147l-6.907,4.464 c-3.479,2.249-4.476,6.891-2.228,10.37c2.249,3.479,6.894,4.476,10.37,2.228l16.8-10.859c2.153-1.392,3.446-3.787,3.429-6.351 c-0.018-2.563-1.344-4.94-3.516-6.302l-73.218-45.909C150.749,127.792,147.647,127.795,145.209,129.33z"> </path>
                                <path d="M270.089,288.846c2.187-3.518,1.109-8.142-2.409-10.329l-74.337-46.221c-3.518-2.188-8.143-1.109-10.329,2.409 c-2.187,3.518-1.109,8.142,2.409,10.329l74.337,46.221c1.232,0.767,2.601,1.132,3.953,1.132 C266.219,292.387,268.669,291.131,270.089,288.846z"> </path>
                                <path d="M53.527,192.864c-2.187,3.518-1.109,8.142,2.409,10.329l183.478,114.081c1.232,0.767,2.601,1.132,3.953,1.132 c2.506,0,4.956-1.256,6.376-3.541c2.187-3.518,1.109-8.142-2.409-10.329L63.856,190.455 C60.338,188.266,55.714,189.346,53.527,192.864z"> </path>
                            </g>
                        </svg>
                        <div className="font-semibold inline-block">Thể loại sách được chú ý</div>
                    </div>
                    <div className='text-gray-400 hover:text-red-700'>Xem tất cả</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

                    <div className="rounded overflow-hidden shadow-lg flex flex-col">

                        <div className="relative">
                            <img className="w-full"
                                src="https://simg.zalopay.com.vn/zlp-website/assets/Sach_dam_nghi_lon_6505f38ece.jpg?v=1536810083057?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                                alt="Sunset in the mountains" />
                            <div
                                className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                            </div>


                            <div
                                className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                                Đọc
                            </div>

                        </div>
                        <div className="px-6 py-4 mb-auto">
                            <div
                                className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                                Dám nghĩ lớn</div>
                            <p className="text-gray-500 text-sm">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </div>
                        <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                            <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
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

                            <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                                <svg className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                                    </path>
                                </svg>
                                <span className="ml-1">39 Comments</span>
                            </span>
                        </div>
                    </div>


                    <div className="rounded overflow-hidden shadow-lg flex flex-col">

                        <div className="relative">
                            <img className="w-full"
                                src="https://simg.zalopay.com.vn/zlp-website/assets/sach_hay_nhat_nen_doc_hat_giong_tam_hon_9187a42c48.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                                alt="Sunset in the mountains" />
                            <div
                                className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                            </div>

                            <div
                                className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                                Đọc
                            </div>

                        </div>
                        <div className="px-6 py-4 mb-auto">
                            <div
                                className="font-medium text-lg  hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                                Hạt giống tâm hồn</div>
                            <p className="text-gray-500 text-sm">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </div>
                        <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                            <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                                <svg height="13px" width="13px" version="1.1" id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg" x="0px"
                                    y="0px" viewBox="0 0 512 512" >
                                    <g>
                                        <g>
                                            <path
                                                d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                                            </path>
                                        </g>
                                    </g>
                                </svg>
                                <span className="ml-1"> 10 days ago</span>
                            </span>

                            <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                                <svg className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                                    </path>
                                </svg>
                                <span className="ml-1">0 Comments</span>
                            </span>
                        </div>
                    </div>

                    <div className="rounded overflow-hidden shadow-lg flex flex-col">

                        <div className="relative">
                            <img className="w-full"
                                src="https://simg.zalopay.com.vn/zlp-website/assets/sach_hay_nhat_nen_doc_hanh_trinh_ve_phuong_dong_b9d61fdb08.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                                alt="Sunset in the mountains" />
                            <div
                                className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                            </div>

                            <div
                                className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                                Đọc
                            </div>

                        </div>
                        <div className="px-6 py-4 mb-auto">
                            <div
                                className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                                Hành trình về phương Đông
                            </div>
                            <p className="text-gray-500 text-sm">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </div>
                        <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                            <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
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
                                <span className="ml-1">16 hours ago</span>
                            </span>

                            <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                                <svg className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                                    </path>
                                </svg>
                                <span className="ml-1">9 Comments</span>
                            </span>
                        </div>
                    </div>

                    <br />

                </div>

            </div>
        </>
    )
}
