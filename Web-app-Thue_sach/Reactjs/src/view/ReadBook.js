import React, { useEffect, useState } from 'react'
import { apigetBookRead } from '../Service/UserService'
import { useSelector } from 'react-redux';

export default function ReadBook() {
    const [book, setBook] = useState();
    const userData = useSelector((state) => state.user);
    const getBook = async () => {

        let res = await apigetBookRead(userData.userInfo.id, 1);
        if (res && res.status === 200) {
            setBook(res.data)

        }
    }
    console.log("check book>>>>: ", book)
    useEffect(() => {
        getBook();
    }, [])
    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Sách đọc trực tuyến</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Hình</th>
                        <th className="py-2 px-4 border-b">Tên</th>
                        <th className="py-2 px-4 border-b">Duyệt</th>
                        <th className="py-2 px-4 border-b">Thêm Chương</th>
                    </tr>
                </thead>
                <tbody>
                    {book && book.length > 0 &&
                        book.map((item, index) => (
                            <tr key={index}>
                                <td className=" py-2 px-4 border-b">
                                    <img src={`http://localhost:8000/img/${item.hinh}`}
                                        alt={`${item.hinh}`} className="w-28 h-28 rounded-full" />
                                </td>
                                <td className="py-2 px-4 border-b">{item.ten}</td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Duyệt</button>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-green-500 text-white px-4 py-2 rounded">Thêm Chương</button>
                                </td>
                            </tr>
                        ))

                    }

                    {/* Thêm các dòng khác tương tự cho từng sách */}
                </tbody>
            </table>
        </div>
    )
}
