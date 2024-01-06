import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiChapter, apiSendComment, callApiComment, detailBookUser } from '../Service/UserService';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import iziToast from 'izitoast';
import ReactPaginate from 'react-paginate';
import { ADD_TO_CART } from '../app/userCard';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
export default function Detail_book() {
  const [item, setDetail] = useState({});
  const [noidung, setNoidung] = useState('');
  const [comments, setComments] = useState([]);
  const [listChapter, setListChapter] = useState();
  const [totalPage, setTotalPage] = useState();
  const [info, setinfo] = useState(null);
  let { id } = useParams();
  const login = useSelector((state) => state.user);
  const userData = useSelector((state) => state.user);
  let users_id = userData.userInfo;
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleAdd = (_item) => {
    // var item = { ...userData };
    if (!login.isLogin) {
      iziToast.warning({
        title: "Vui lòng đăng nhập!",
        position: "center",
        buttons: [
          ['<button>Tới trang đăng nhập</button>', function (instance, toast) {
            navigate('/signin');
          }, true], // true to focus
          ['<button>Ở lại trang</button>', function (instance, toast) {
            instance.hide({
              transitionOut: 'fadeOutUp',
              onClosing: function (instance, toast, closedBy) {
                console.info('closedBy: ' + closedBy); // The return will be: 'closedBy: buttonName'
              }
            }, toast, 'buttonName');
          }]
        ],
        onOpening: function (instance, toast) {
          console.info('callback abriu!');
        },
        onClosing: function (instance, toast, closedBy) {
          console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
        }
      });

    } else {
      if (login.userInfo.ten === _item.nguoidang) {
        iziToast.warning({
          title: "Không thể thuê sản phẩm của bạn!",
          position: "center",
        })
        return;
      } else {
        dispatch(ADD_TO_CART(_item));
      }

    }
  }

  const Read = () => {

  }
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div className="container mx-auto my-8 ">
        <div className='flex'>


        </div>
        <Grid container spacing={2}>
          <Grid xs={5}>
            <div className="w-4/3 pr-8">
              {item && item.hinh && (
                <img
                  src={`http://localhost:8000/img/${item.hinh}`}
                  alt={`${item.hinh}`}
                  className="w-2/3 h-96 bg-cover rounded"
                />
              )}

            </div>
            <div>
              <div>
                <p>Đánh giá:</p>
                <div className="flex">

                  <Stack spacing={1}>
                    <Rating name="size-large" defaultValue={item.danhgia} size="large" />
                  </Stack>


                </div>
              </div>
            </div>
          </Grid>
          <Grid xs={7} className="p-4 bg-white rounded-md shadow-md">

            <div className="w-3/4">
              <h2 className="text-3xl font-bold mb-4">{item.ten}</h2>
              {item.loai === 0 ? <>
                <div className='w-full flex'>
                  <div className="w-1/2">
                    <strong className="text-sm">Tiền đặt cọc:</strong> {item.tiencoc} vnđ
                  </div>
                  <div className="w-1/2">
                    <strong className="text-sm">Giá thuê:</strong> {item.gia} vnđ
                  </div>
                </div>
                <br />
                {item.trangthaithue === 'dangthue' ? <>
                  <div className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 w-48 mx-auto">
                    Đã có người thuê
                  </div></> : <>
                  <div className='w-full'>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-48 mx-auto"
                      onClick={(e) => handleAdd(item)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div></>}

              </> : <>
                <div className='w-full'>
                  <button
                    className="bg-blue-500 w-44 text-white px-4 py-2 rounded hover:bg-blue-700 mx-auto"
                    onClick={Read}
                  >
                    Đọc ngay
                  </button>
                </div>
              </>}
            </div>
            <div className='pt-16'>
              <h3 className="text-2xl font-bold mb-4 text-indigo-700">Thông tin chi tiết</h3>
              <div className={`mb-2 ${!showMore ? 'overflow-hidden line-clamp-3' : ''}`}><strong>Mã sách:</strong> {item.masach}</div>
              <div className={`mb-2 ${!showMore ? 'overflow-hidden line-clamp-3' : ''}`}><strong>Tên sách:</strong> {item.ten}</div>
              {showMore && (
                <>
                  <div className="mb-2"><strong>Thể loại:</strong> {item.theloai}</div>
                  <div className="mb-2"><strong>Người đăng:</strong> {item.nguoidang}</div>
                  <div className="mb-2"><strong>Số điện thoại người đăng:</strong> {item.sdt}</div>
                  <div className="mb-2"><strong>Tác giả:</strong> {item.tentacgia}</div>
                  <div className={`mb-2 ${showMore ? '' : 'overflow-hidden line-clamp-2'}`}>
                    <strong>Trạng thái thuê</strong>: {item.trangthaithue === 'chuathue' ? 'Có thể thuê' : 'Đang được thuê'}
                  </div>
                  <div className={`mb-2 ${showMore ? '' : 'overflow-hidden line-clamp-2'}`}>{item.noidung}</div>
                  <button className="text-blue-500 hover:underline" onClick={e => setShowMore(false)}>Ẩn bớt</button>
                </>
              )}
              {!showMore && (
                <button className="text-blue-500 hover:underline" onClick={e => setShowMore(true)}>Xem thêm</button>
              )}
            </div>
          </Grid>
        </Grid>
      </div>

      {item.loai === 1 ? <>
        <div className="container p-4 bg-white rounded-md shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listChapter && listChapter.map((chapter) => (
              <Link key={chapter.id} to={`/detailchapter/${item.id}/${chapter.chuong}`}>
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

        </>}
      <br />
      <div className="w-full mx-auto px-4 shadow-lg py-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
            Lượt bình luận ({comments.length})
          </h2>
        </div>
        {!userData?.isLogin ? <>Chỉ có thành viên mới có thể viết nhận xét.Vui lòng đăng nhập hoặc đăng ký.</> : <>
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
      <br />
    </>
  )


}
