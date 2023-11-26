import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiSendComment, callApiComment, detailBookUser } from '../Service/UserService';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import iziToast from 'izitoast';

export default function Detail_book() {
  const [detail, setDetail] = useState({});
  const [noidung, setNoidung] = useState('');
  const [comments, setComments] = useState([]);

  let { id } = useParams();
  const userData = useSelector((state) => state.user);
  let users_id = userData.userInfo.id;

  useEffect(() => {
    detailBook();
    showComment();
  }, []);

  const detailBook = async () => {
    let data = await detailBookUser(id);
    setDetail(data.data);
  }

  const showComment = async () => {
    let res = await callApiComment(id);
    if (res && res.status === 200) {
      setComments(res.data);
    }
  }

  const handleCommentSubmit = async () => {
    try {
      let send = await apiSendComment(id, users_id, noidung);
      if (send && send.status === 200) {
        iziToast.success({
          title: "Bạn đã đăng một bình luận",
          position: "bottomRight"
        });

        // Thêm bình luận mới vào danh sách bình luận
        setComments([...comments, send.data]);

        // Xóa nội dung bình luận từ trạng thái sau khi đăng
        setNoidung('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  const addToCart = () => {

  }

  return (
    <>
      <div className="container mx-auto my-8 flex">
        {/* Hình ảnh sách bên trái */}
        <div className="w-1/2 pr-8">
          <img
            src={`http://localhost:8000/img/${detail.hinh}`}
            alt={`${detail.hinh}`}
            className="w-full h-auto rounded"
          />
        </div>
        {/* Phần chi tiết sách (bao gồm phần bình luận) bên phải */}
        <div className="w-1/2">
          <h2 className="text-3xl font-bold mb-4">{detail.ten}</h2>
          <p className="text-gray-700 mb-4">
            Mô tả: {detail.noidung}
          </p>
          <div className="mb-4 text-sm">
            <strong className="text-sm">Thể loại:</strong> {detail.theloai}
          </div>
          <div className="mb-4">
            <strong className="text-sm">Người đăng:</strong> {detail.nguoidang}
          </div>
          <div className="mb-4">
            <strong className="text-sm">Tác giả:</strong> {detail.tentacgia}
          </div>
          {detail.loai === 0 ? <>
            <div className="mb-4">
              <strong className="text-sm">Tiền đặt cọc:</strong> {detail.tiencoc} vnđ
            </div>
            <div className="mt-4">
              <strong className="text-sm">Giá thuê: {detail.gia} vnđ</strong>
            </div>
            <br />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={addToCart}
            >
              Thêm vào giỏ hàng
            </button>
          </> : <>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={addToCart}
            >
              Đọc ngay
            </button>
          </>}
        </div>
      </div>
      {/* code bình luận */}

      <div className="w-full mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
            Lượt bình luận ({comments.length})
          </h2>
        </div>


        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
          <label htmlFor="comment">Bình luận:</label>
          <textarea
            id="noidung"
            rows="6"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
            placeholder="Viết bình luận..."
            value={noidung}
            onChange={(e) => setNoidung(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-700"
          onClick={handleCommentSubmit}
        >
          Gửi bình luận
        </button>
        <div className="my-4" />
        {comments.map((comment, index) => (
          <React.Fragment key={index}>
            <article
              className={`p-6 text-base shadow-xl rounded-lg ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                }`}
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={comment.hinh}
                      alt={comment.hinh}
                    />
                    {comment.ten}
                  </p>
                  <p className="text-sm text-gray-600 ">
                    {dayjs(comment.ngaytao).format(' DD-MM-YYYY')}
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 ">{comment.noidung}</p>
              {/* Các nút trả lời hoặc báo cáo */}
            </article>
            {index !== comments.length - 1 && (
              <div className="my-4" />
            )}
          </React.Fragment>
        ))}
      </div>

    </>
  )


}
