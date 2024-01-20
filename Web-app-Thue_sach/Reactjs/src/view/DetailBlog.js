import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiDetailBlog } from '../Service/UserService';

const DetailPost = () => {
    const { id } = useParams();
    const [postDetail, setPostDetail] = useState(null);

    useEffect(() => {
        // Gọi API với tham số id
        const fetchPostDetail = async () => {
            try {
                const response = await apiDetailBlog(id);
                setPostDetail(response.data);
            } catch (error) {
                console.error('Error fetching post detail:', error);
            }
        };

        fetchPostDetail();
    }, [id]);

    return (
        <div className="max-w-screen-lg mx-auto my-8 w-4/5">
            {postDetail ? (
                <>
                    <h2 className="text-3xl font-bold mb-4">{postDetail.ten}</h2>
                    <div className="flex items-center mb-4 text-gray-600">
                        {postDetail.date}
                    </div>
                    <div className="text-gray-800">
                        <p dangerouslySetInnerHTML={{ __html: postDetail.noidung }}></p>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DetailPost;
