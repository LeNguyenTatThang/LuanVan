import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiChapter, apiSendComment, callApiComment, detailBookUser } from '../Service/UserService';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import iziToast from 'izitoast';
import ReactPaginate from 'react-paginate';
export default function Detail_book() {
  const [detail, setDetail] = useState({});
  const [noidung, setNoidung] = useState('');
  const [comments, setComments] = useState([]);
  const [listChapter, setListChapter] = useState();
  const [totalPage, setTotalPage] = useState();
  const [info, setinfo] = useState(null);
  let { id } = useParams();

  const userData = useSelector((state) => state.user);
  let users_id = userData.userInfo;

  useEffect(() => {
    detailBook();
    showComment();
    callApiChapter();
  }, []);
  //apiChapter
  const callApiChapter = async (page) => {
    try {
      let chapter = await apiChapter(page, id);

      if (chapter && chapter.status === 200) {
        console.log('Chapter Data:', chapter.data);
        setListChapter(chapter.data);

        setTotalPage(chapter.totalPage);
      } else {
        setinfo(chapter.data.message)
        console.error('Error fetching chapter:', chapter);
      }
    } catch (error) {
      console.error('Error calling apiChapter:', error);
    }
  }
  console.log(info)
  const handlePageClick = (event) => {
    const selectedPage = +event.selected + 1;
    console.log('Selected Page:', selectedPage);
    callApiChapter(selectedPage);
  }

  console.log("hiển thị các chương", listChapter)
  const detailBook = async () => {
    try {
      let data = await detailBookUser(id);
      setDetail(data.data);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  }


  const showComment = async () => {
    try {
      let res = await callApiComment(id);
      if (res && res.status === 200) {
        setComments(res.data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }


  const handleCommentSubmit = async () => {
    try {
      let send = await apiSendComment(id, users_id.id, noidung);
      if (send && send.status === 200) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        iziToast.success({
          title: "Bạn đã đăng một bình luận",
          position: "bottomRight",
          onClosed: function () {
            window.location.reload();
          }
        });


        setComments([...comments, send.data]);
        setNoidung('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      iziToast.error({
        title: "Lỗi",
        position: "bottomRight",
        message: "Đã xảy ra lỗi khi đăng bình luận. Vui lòng thử lại sau."
      });
    }
  }

  const addToCart = () => {

  }

  return (
    <>
      <div className="container mx-auto my-8 flex">
        <div className="w-1/2 pr-8">
          {detail && detail.hinh && (
            <img
              src={`http://localhost:8000/img/${detail.hinh}`}
              alt={`${detail.hinh}`}
              className="w-full h-auto rounded"
            />
          )}
          <div>
            <p>Đánh giá:</p>
            <div className="flex">
              {Array.from({ length: detail.danhgia }).map((_, index) => (
                <span
                  key={index}
                  role="img"
                  aria-label="star"
                  className="mr-1"
                  style={{ fontSize: '35px', color: 'gold' }}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>



        </div>
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
      {info === null ? <>
        <div className="container p-4 bg-white rounded-md shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listChapter && listChapter.map((chapter) => (
              <Link key={chapter.id} to={`/detailchapter/${detail.id}/${chapter.chuong}`}>
                <div className="bg-white p-4 rounded-md shadow-md">
                  <p className="text-gray-600 font-bold">Chương {chapter.chuong}</p>
                  <h3 className="text-xl font-semibold">{chapter.tieude}</h3>
                </div>
              </Link>
            ))}

          </div>

          <div className="mt-8 flex justify-center">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={totalPage}
              previousLabel="< previous"
              pageClassName='page-item'
              pageLinkClassName='page-link'
              previousClassName='page-item'
              previousLinkClassName='page-link'
              nextClassName='page-item'
              nextLinkClassName='page-link'
              breakClassName='page-item'
              breakLinkClassName='page-link'
              containerClassName='pagination'
              activeClassName='active'
            />
          </div>
        </div>
      </>

        : <>
          {info}
        </>}
      <br />
      <div className="w-full mx-auto px-4 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
            Lượt bình luận ({comments.length})
          </h2>
        </div>
        {!userData?.isLogin ? <>Bạn cần đăng nhập để bình luận và xem bình luận</> : <>
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
          {comments?.length > 0 && comments?.map((show, index) => (
            <React.Fragment key={index}>
              <article
                className={`p-6 text-base shadow-xl rounded-lg ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                  }`}
              >
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                      {show && show.hinh && (
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src={`http://localhost:8000/img/${show.hinh}`}
                          alt={`${show.hinh}`}
                        />
                      )}
                      {show && show.ten && (
                        <p>{show.ten}</p>
                      )}

                    </p>
                    {show && show.ngaytao && (
                      <p className="text-sm text-gray-600 ">
                        {dayjs(show.ngaytao).format(' DD-MM-YYYY')}
                      </p>
                    )}

                  </div>
                </footer>
                {show && show.noidung && (
                  <p className="text-gray-500 ">{show.noidung}</p>
                )}

                {/* Các nút trả lời hoặc báo cáo */}
              </article>
              {index !== comments.length - 1 && (
                <div className="my-4" />
              )}
            </React.Fragment>
          ))}
        </>}
      </div>
    </>
  )


}
