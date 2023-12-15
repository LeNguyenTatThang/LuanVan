/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiBookAuthur } from '../Service/UserService';

export default function Authur() {
    const [books, setBooks] = useState();
    let id_tacgia = 1
    const callBookAuthur = async () => {
        let res = await apiBookAuthur(id_tacgia)
        if (res && res.status === 200) {
            setBooks(res.data.data)
        }
    }
    useEffect(() => {
        callBookAuthur();

    }, [])
    console.log(books)
    return (
        <div className='container py-4 mx-auto'>
            <div className='w-11/12 mx-auto row py-2 bg-slate-300 rounded-2 gap-2 px-2 shadow-xl '>
                <Link to='/review'>
                    <div className='flex px-1 bg-white rounded-2 gap-5 py-3'>
                        <div className='w-24 h-18'>
                            <img src='https://cdn.codegym.vn/wp-content/uploads/2023/06/Bia-sach-Lap-trinh-can-ban-Copy-Copy-02-scaled.jpg' />
                        </div>
                        <div className='flex items-center py-1 px-1 justify-between w-full'>
                            <div className='py-1 text-clamp-1 w-52 overflow-hidden text-lg'>Lập trình C++</div>
                            <div className="flex items-center mt-1">
                                <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                <svg className="w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            </div>
                            <div className='text-sm '>Free</div>
                        </div>
                    </div>
                </Link>
                <Link to='/review'>
                    <div className='flex px-1 bg-white rounded-2 gap-5 py-3'>
                        <div className='w-24 h-18'>
                            <img src='https://cdn.codegym.vn/wp-content/uploads/2023/06/Bia-sach-Lap-trinh-can-ban-Copy-Copy-02-scaled.jpg' />
                        </div>
                        <div className='flex items-center py-1 px-1 justify-between w-full'>
                            <div className='py-1 text-clamp-1 w-52 overflow-hidden text-lg'>Lập trình C#</div>
                            <div className="flex items-center mt-1">
                                <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                <svg className="w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            </div>
                            <div href='' className='text-sm '>Fee</div>
                        </div>
                    </div>
                </Link>
                <div className='flex px-1 bg-white rounded-2 gap-5 py-3'>
                    <div className='w-24 h-18'>
                        <img src='https://cdn.codegym.vn/wp-content/uploads/2023/06/Bia-sach-Lap-trinh-can-ban-Copy-Copy-02-scaled.jpg' />
                    </div>
                    <div className='flex items-center py-1 px-1 justify-between w-full'>
                        <div className='py-1 text-clamp-1 w-52 overflow-hidden text-lg'>Lập trình căn bản</div>
                        <div className="flex items-center mt-1">
                            <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <svg className="w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                        </div>
                        <div href='' className='text-sm '>Fee</div>
                    </div>
                </div>

                <div className='flex px-1 bg-white rounded-2 gap-5 py-3'>
                    <div className='w-24 h-18'>
                        <img src='https://cdn.codegym.vn/wp-content/uploads/2023/06/Bia-sach-Lap-trinh-can-ban-Copy-Copy-02-scaled.jpg' />
                    </div>
                    <div className='flex items-center py-1 px-1 justify-between w-full'>
                        <div className='py-1 text-clamp-1 w-52 overflow-hidden text-lg'>Kỹ thuật lập trình</div>
                        <div className="flex items-center mt-1">
                            <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <svg className="w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                        </div>
                        <div href='' className='text-sm '>15 000 vnd</div>
                    </div>
                </div>

            </div>



        </div>
    )
}
