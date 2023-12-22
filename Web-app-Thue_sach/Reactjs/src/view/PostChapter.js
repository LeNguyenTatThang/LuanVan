import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { apiPostCHapter } from '../Service/UserService';
import iziToast from 'izitoast';
export default function PostChapter(props) {
    const { itemId } = useParams();
    console.log(itemId)
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const [content, setContent] = useState();
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setContent(file)
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData((prevData) => ({
                    ...prevData,
                    content: event.target.result,
                }));
            };
            reader.readAsText(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.title === '') {
            iziToast.error({
                title: "Thêm tiêu đề",
                position: "topRight",
            })
        }
        if (content === '') {
            iziToast.error({
                title: "Thêm nội dung",
                position: "topRight",
            })
        }
        let res = await apiPostCHapter(content, itemId, formData.title)
        if (res && res.status === 200) {
            iziToast.success({
                title: "Thêm thành công",
                position: "topRight",
                message: res.message,
            })
        } else {
            iziToast.error({
                title: "Lỗi",
                position: "topRight",
                message: res && res.message ? res.message : "Không thêm được",
            })
        }
        setFormData({
            title: '',
            content: '',
        });
    };

    useEffect(() => {

    }, [])

    return (
        <div className="max-w-2xl mx-auto mt-8"> {/* Adjusted max-w-2xl */}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Tiêu đề
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Nhập tiêu đề"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Nội dung (thêm nội dung bằng tệp .txt)
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        placeholder="Nội dung sẽ xuất hiện ở đây"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-96  resize-none"
                        readOnly
                    />
                    <input
                        type="file"
                        accept=".txt"
                        onChange={handleFileChange}
                        className="mt-2"
                    />
                    {formData.file && (
                        <div className="mt-2 text-gray-700">
                            Chọn tệp: {formData.file}
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Đăng
                    </button>
                </div>
            </form>
        </div>

    );
}