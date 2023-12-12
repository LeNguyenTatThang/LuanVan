import React, { useState, useEffect } from 'react';

import { callApiChapter } from '../Service/UserService';

function DetailChapter() {
    // Khai báo state để lưu trữ giá trị của id và sach_id
    const [id, setId] = useState(1);
    const [sachId, setSachId] = useState(13);
    const [chapterData, setChapterData] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Mặc định là màu trắng
    const [fontSize, setFontSize] = useState(16); // Mặc định là cỡ chữ 16px

    const response = async () => {
        let res = await callApiChapter(id, sachId);
        setChapterData(res.data);
    }
    console.log(chapterData)
    useEffect(() => {
        response();

    }, [id, sachId]);
    const handleNextChapter = () => {
        // Logic để chuyển đến chương kế tiếp
        setId(id + 1);
    };

    const handlePreviousChapter = () => {
        // Logic để chuyển đến chương trước đó
        if (id > 1) {
            setId(id - 1);
        }
    };
    const handleBackgroundColorChange = (color) => {
        setBackgroundColor(color);
    };

    const handleFontSizeChange = (size) => {
        setFontSize(size);
    };

    return (
        <div className="container mx-auto p-1">
            <h1 className="text-3xl font-bold mb-4">Tên sách</h1>
            <div className="mt-1 flex justify-between">
                <button
                    onClick={handlePreviousChapter}
                    className="bg-blue-500 text-white p-1 rounded"
                >
                    Previous
                </button>
                <div className="mb-2 flex items-center">
                    <label className="mr-2">Chương:</label>
                    <input
                        type="number"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>

                <button
                    onClick={handleNextChapter}
                    className="bg-blue-500 text-white p-3 rounded"
                >
                    Next
                </button>
            </div>
            {chapterData && (
                <div style={{ alignItems: 'center', backgroundColor, fontSize: `${fontSize}px` }}>
                    {/* Tiêu đề và Các Input */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>
                        {/* Tiêu đề */}
                        <h1 className="text-2xl font-bold mb-2">Chương {chapterData.chuong}: Title</h1>

                        {/* Chọn Màu Nền */}
                        <label className="mb-2">
                            Màu nền:
                            <input
                                type="color"
                                value={backgroundColor}
                                onChange={(e) => handleBackgroundColorChange(e.target.value)}
                            />
                        </label>

                        {/* Chọn Cỡ Chữ */}
                        <label>
                            Cỡ chữ:
                            <input
                                type="number"
                                value={fontSize}
                                onChange={(e) => handleFontSizeChange(e.target.value)}
                                className='w-12'
                            />
                        </label>
                    </div>

                    {/* Nội dung chương */}
                    <div className='' style={{ flex: 2, padding: '20px' }}>
                        <p className='overflow-auto w-4/5 break-words'>{chapterData.noidung}</p>
                    </div>
                </div>
            )}


            <div className="mt-1 flex justify-between">
                <button
                    onClick={handlePreviousChapter}
                    className="bg-blue-500 text-white p-1 rounded"
                >
                    Previous
                </button>
                <div className="mb-2 flex items-center">
                    <label className="mr-2">Chương:</label>
                    <input
                        type="number"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>


                <button
                    onClick={handleNextChapter}
                    className="bg-blue-500 text-white p-3 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
}


export default DetailChapter;
