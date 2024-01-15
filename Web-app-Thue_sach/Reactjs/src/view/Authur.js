/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiBookAuthur } from '../Service/UserService';

export default function Authur() {
    const { id_tacgia } = useParams();
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tacgia, setTentacgia] = useState();
    const callBookAuthur = async () => {
        try {
            let res = await apiBookAuthur(id_tacgia);

            if (res !== undefined && res.data) {
                setBooks(res.data);
                setTentacgia(res.data[0].tentacgia)
                setLoading(false);
            } else {
                console.error("Invalid API response format - 'data' property not found");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };
    console.log(tacgia)
    useEffect(() => {
        callBookAuthur();

    }, []);
    const apiUrl = 'http://localhost:8000';
    return (
        <div className='container py-4 mx-auto'>

            <div className="border-b mb-5 flex justify-between text-sm">

                <div className="text-orange-500 flex items-center pb-2 pr-2 border-b-2 border-gray-700 uppercase">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="h-6 mr-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>

                    <div className="font-semibold inline-block">Tác giả {tacgia}</div>
                </div>
                <div className='text-gray-400 hover:text-red-700'></div>
            </div>
            <div className='w-11/12 mx-auto row py-2 bg-slate-300 rounded-2 gap-2 px-2 shadow-xl '>
                {books && books.length > 0 &&
                    books.map((item, index) => {
                        return (
                            <>
                                <div key={index}>
                                    <div className='flex px-1 bg-white rounded-2 gap-5 py-3'>
                                        <div className='w-24 h-18'>
                                            <img src={`${apiUrl}/img/${item.hinh}`} />
                                        </div>

                                        <div className='flex items-center py-1 px-1 justify-between w-full'>
                                            <Link to={`/detail-book/${item.id}`}>
                                                <div className='py-1 text-clamp-1 w-52 overflow-hidden text-lg'>{item.ten}</div> </Link>
                                            <div className="flex items-center mt-1">
                                                Thể loại: {item.theloai}
                                            </div>
                                            {item.loai === 0 ? <>
                                                <div className='text-sm '>{item.gia}vnđ/7 ngày</div>
                                            </> : <>

                                            </>}

                                        </div>

                                    </div>
                                </div >
                            </>
                        )
                    })}



            </div>



        </div >
    )
}
