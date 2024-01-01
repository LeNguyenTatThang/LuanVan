import React, { useState, useEffect } from 'react';
import { callApiChapter, detailBookUser } from '../Service/UserService';
import { useParams, useNavigate } from 'react-router-dom';

function DetailChapter() {
    const [chapterData, setChapterData] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [fontSize, setFontSize] = useState(16);
    const { sach_id, chuong: initialChuong } = useParams();
    const [chuong, setChuong] = useState(initialChuong);
    const navigate = useNavigate();

    const response = async () => {
        let res = await callApiChapter(sach_id, chuong);
        setChapterData(res.data);
    };

    useEffect(() => {
        response();
        detailBook();
    }, [sach_id, chuong]);

    const handleBackgroundColorChange = (color) => {
        setBackgroundColor(color);
    };

    const handleFontSizeChange = (size) => {
        setFontSize(size);
    };

    const handleNextChapter = () => {
        // Logic to switch to the next chapter
        const nextChapter = parseInt(chuong, 10) + 1;
        navigate(`/detailchapter/${sach_id}/${nextChapter}`);
    };

    const handlePreviousChapter = () => {
        // Logic to switch to the previous chapter
        const previousChapter = parseInt(chuong, 10) - 1;
        if (previousChapter > 0) {
            navigate(`/detailchapter/${sach_id}/${previousChapter}`);
        }
    };
    const [detail, setDetail] = useState({});
    const detailBook = async () => {
        try {
            let data = await detailBookUser(sach_id);
            setDetail(data.data);
        } catch (error) {
            console.error('Error fetching book details:', error);
        }

    }
    console.log(detail)
    return (
        <div className="container mx-auto p-1">
            <h1 className="text-3xl font-bold mb-4">Tên sách: {detail.ten}</h1>
            <div className="mt-1 flex justify-between">

                <div className="mb-2 flex items-center mx-auto">
                    <label className="mr-2">Chương:</label>
                    <input
                        type="number"
                        value={chuong}
                        onChange={(e) => setChuong(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>

            </div>
            {chapterData && (
                <div style={{ alignItems: 'center', backgroundColor, fontSize: `${fontSize}px` }}>
                    {/* Tiêu đề và Các Input */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>
                        {/* Tiêu đề */}
                        <h1 className="text-2xl font-bold mb-2">Chương {chapterData.chuong}: {chapterData.tieude}</h1>

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

        </div>
    );
}


export default DetailChapter;
