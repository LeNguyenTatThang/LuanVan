import React from 'react'
import { Link } from 'react-router-dom';
const Post = ({ id, ten, noidung, date }) => {
    const handleClick = () => {
        // Thực hiện bất kỳ công việc cần thiết trước khi chuyển trang
        console.log(`Redirecting to post with id: ${id}`);
    };
    return (
        <div className="max-w-2xl mx-auto my-8 bg-white p-8 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <h2 className="text-3xl font-bold mb-4">{ten}</h2>
            <div className="flex items-center mb-4 text-gray-600">
                {date}
            </div>
            <div className="text-gray-800 max-w-full line-clamp-3"> {/* Giới hạn hiển thị nội dung trong 3 dòng */}
                <p dangerouslySetInnerHTML={{ __html: noidung }}></p>
            </div>
            <div className="flex justify-between mt-6">
                <button className="flex items-center text-blue-500 hover:underline">
                    <Link to={`/posts/${id}`} onClick={handleClick} className="flex items-center text-blue-500 hover:underline">
                        <span>Read More</span>
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default Post;
