import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiChapter, apiCountRate, apiRating, apiSendComment, callApiComment, detailBookUser, randomBookCate } from '../Service/UserService';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import iziToast from 'izitoast';
import ReactPaginate from 'react-paginate';
import { ADD_TO_CART } from '../app/userCard';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Box, Grid } from '@mui/material';
import LazyLoad from 'react-lazyload';

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
  const [randBook, setRandBook] = useState();
  const apiUrl = 'http://localhost:8000';
  const card = useSelector((state) => state.shop.cart);
  const danhgia = item?.danhgia
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

  const handlePageClick = (event) => {
    const selectedPage = +event.selected + 1;
    console.log('Selected Page:', selectedPage);
    callApiChapter(selectedPage);
  }


  const detailBook = async () => {
    try {
      let data = await detailBookUser(id);
      setDetail(data.data);
      if (data && data.status === 200) {
        //randomBookCate
        let random = await randomBookCate(data.data.theloai_id, data.data.id)
        setRandBook(random.data)
        const countRating = async () => {
          let count = await apiCountRate(id)
          console.log(count)
          if (count && count.status === 200) {
            setCountData(count)
          }
        }
      }
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

  useEffect(() => {
    detailBook();
    showComment();
    callApiChapter();
    countRating();
  }, []);
  const changeRating = async (sach_id, event) => {
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
      return;
    } else {
      let rate = await apiRating(users_id.id, sach_id, event.target.value)
      //let rate = await apiRating(users_id.id, sach_id, value)
      if (rate && rate.status === 200) {
        iziToast.success({
          title: "Bạn đã đánh giá sản phẩm",
          position: "bottomRight"
        })
      }
    }
  }
  const [countData, setCountData] = useState();
  const countRating = async () => {
    let count = await apiCountRate(id)
    if (count && count.status === 200) {
      setCountData(count)
    }
  }
  console.log(countData)
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
                  src={`${apiUrl}/img/${item.hinh}`}
                  alt={`${item.hinh}`}
                  className="w-2/3 h-96 bg-cover rounded"
                />
              )}

            </div>
            <div>
              <Rating name="half-rating-read" value={parseInt(item.danhgia, 10)} precision={0.5} size="large" readOnly />
              Tổng số lượt đánh giá ({countData?.sldanhgia5 + countData?.sldanhgia4 + countData?.sldanhgia3 + countData?.sldanhgia2 + countData?.sldanhgia1})
              <div className='flex flex-col items-start pl-1'>
                <br />
                <div className='flex items-center mb-2'>
                  <Rating name="half-rating-read" value={5} size="small" readOnly />
                  <span className='ml-2'>({countData?.sldanhgia5}) lượt đánh giá</span>
                </div>
                <div className='flex items-center mb-2'>
                  <Rating name="half-rating-read" value={4} size="small" readOnly />
                  <span className='ml-2'>({countData?.sldanhgia4}) lượt đánh giá</span>
                </div>
                <div className='flex items-center mb-2'>
                  <Rating name="half-rating-read" value={3} size="small" readOnly />
                  <span className='ml-2'>({countData?.sldanhgia3}) lượt đánh giá</span>
                </div>
                <div className='flex items-center mb-2'>
                  <Rating name="half-rating-read" value={2} size="small" readOnly />
                  <span className='ml-2'>({countData?.sldanhgia2}) lượt đánh giá</span>
                </div>
                <div className='flex items-center'>
                  <Rating name="half-rating-read" value={1} size="small" readOnly />
                  <span className='ml-2'>({countData?.sldanhgia1}) lượt đánh giá</span>
                </div>
              </div>

            </div>
          </Grid>
          <Grid xs={7} className=" bg-white rounded-md shadow-md row-3">
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
                    className="bg-blue-500 w-44 text-white px-4 py-2 rounded hover:bg-blue-700 mx-auto p-3"
                    onClick={Read}
                  >
                    Đọc ngay
                  </button>
                </div>
              </>}
            </div>
            <div className='pt-16 p-3'>
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
      <div className=" justify-center items-center h-96">
        <div className="border-b mb-5 flex justify-between text-sm px-8">
          <div className="text-orange-500 flex items-center pb-2 pr-2 border-b-2 border-gray-700 uppercase">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="h-6 mr-3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>

            <div className="font-semibold inline-block">Sản phẩm tương tự</div>
          </div>
          <div className='text-gray-400 hover:text-red-700'></div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-center px-8">
          {randBook && randBook.length > 0 &&
            randBook.map((item, idex) => {
              return (
                <>
                  <div className="rounded overflow-hidden shadow-lg flex flex-col" key={idex}>
                    <div className="relative">
                      <LazyLoad height={200} offset={100}>
                        <img
                          className="w-3/5 mx-auto h-56 object-cover border border-gray-200 shadow-md transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                          src={`${apiUrl}/img/${item.hinh}`}
                          alt={`${item.hinh}`}
                        />
                      </LazyLoad>
                      <div
                        className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                      </div>
                      {item.trangthaithue === 'dangthue' ? <><div className="rounded-full text-xs absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 px-4 py-2 text-white hover:bg-orange-600 transition duration-500 ease-in-out">
                        Sách đang được thuê
                      </div>
                      </> : <>
                        <div
                          className="rounded-full text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-orange-600  transition duration-500 ease-in-out">
                          {item.loai === 0 ? (
                            <>
                              {card.some((product) => product.id === item.id) && login?.userInfo?.id ? (
                                <div className="text-green-500">Đã thêm</div>
                              ) : (
                                <div className="cursor-pointer" onClick={(e) => handleAdd(item)}>
                                  Thuê
                                </div>
                              )}
                            </>
                          ) : (
                            <><Link to={`/detail-book/${item.id}`} >
                              <div className="cursor-pointer">Đọc</div></Link>
                            </>
                          )}
                        </div></>
                      }
                    </div>
                    <Link to={`/detail-book/${item.id}`} >
                      <div className="py-2 w-full">

                        <div className="px-4 mx-auto ">

                          <div className=" cursor-pointer mb-2 w-[300px] h-7 text-clamp-1">
                            <span className='uppercase hover:text-slate-500 font-medium text-lg transition duration-500'>{item.ten}</span>
                          </div>

                        </div>
                        {item.loai === 0 ? <>
                          <div className="flex gap-2 w-full justify-around">
                            <div className="text-sm hover:text-slate-500"><strong>Tiền cọc:</strong> <span className='text-red-500 font-bold'>{item.tiencoc}</span> vnđ</div>
                            <div className="text-sm hover:text-slate-500"><strong>Giá:</strong> <span className='text-red-500 font-bold'>{item.gia}</span> vnđ</div>

                          </div>
                        </> : <>
                        </>}
                        <div className="flex flex-col gap-2 items-center justify-center">
                          <Rating name="size-large" defaultValue={item.danhgia} size="small" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              )
            })}
        </div>
      </div>
      <br />

      <div className="w-full mx-auto px-4 shadow-lg py-4">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
            Lượt bình luận ({comments.length})
          </h2>
        </div>
        <div className='pl-10'>
          <p>Đánh giá:</p>
          <div className="flex">
            <Stack spacing={1}>
              <Rating name="size-large" defaultValue={4} onClick={(event, value) => changeRating(item.id, event)} size="large" />
            </Stack>
          </div>
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
                          src={`https://thuesachadmin.onrender.com/img/${show.hinh}`}
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
