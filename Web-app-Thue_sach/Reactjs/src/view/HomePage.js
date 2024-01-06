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
import Image from '../components/Image';
import ShiftingCountdown from '../components/CountDown';

export default function HomePage() {

    const [authur, setAuthur] = useState([]);
    const [randomBook, setRandomBook] = useState([]);

    const fetchRandomBooks = async () => {
        try {
            let newRandomBooks = [];

            for (const author of authur) {
                const authorId = author.id;
                const data = await apiRandomBook(authorId);
                newRandomBooks = [...newRandomBooks, ...data.data];
            }

            setRandomBook(newRandomBooks);
        } catch (error) {
            console.error('Error fetching random books:', error);
        }
    };

    const getAuthor = async () => {
        try {
            let res = await apiAuthurRandom();
            setAuthur(res.data);
        } catch (error) {
            console.error('Error fetching author:', error);
        }
    };

    useEffect(() => {
        getAuthor();
    }, []);

    useEffect(() => {
        if (authur.length > 0) {
            fetchRandomBooks();
        }
    }, [authur]);

    console.log("check random books>>>>", randomBook);

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

            <div className="w-11/12 mx-auto p-2 sm:p-10 md:p-4">
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
            <br />
            <div className='container'>
                <div className='w-full mx-auto'><Image /></div>
                <br />
                <ShiftingCountdown />

            </div>

        </>
    )
}
