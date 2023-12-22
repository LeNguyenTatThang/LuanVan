import React from 'react'

const Post = ({ title, content, date }) => {
    return (
        <div className="max-w-2xl mx-auto my-8 bg-white p-8 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <div className="flex items-center mb-4 text-gray-600">
                {date}
            </div>
            <p className="text-gray-800">{content}</p>
            <div className="flex justify-between mt-6">
                <button className="flex items-center text-blue-500 hover:underline">
                    <span>Read More</span>
                </button>
            </div>
        </div>
    );
};

export default Post;
