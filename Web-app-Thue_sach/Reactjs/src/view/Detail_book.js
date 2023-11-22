import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { detailBookUser } from '../Service/UserService';


export default function Detail_book() {

  const [detail, setDetail] = useState({});
  let { id } = useParams()

  useEffect(() => {
    detailBook();
  }, [])

  const detailBook = async () => {
    let data = await detailBookUser(id);
    setDetail(data.data)

  }

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
      <section className="bg-white py-8 lg:py-16 antialiased">
        <div className="w-full mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900  ">Lượt bình luận (0)</h2>
          </div>
          <form className="mb-2">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 ">
              <label for="comment" className="sr-only">Bình luận</label>
              <textarea id="comment" rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                placeholder="Viết bình luận ..." required></textarea>
            </div>
            <button type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-orange-300 bg-gray-500 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800">
              Gửi bình luận
            </button>
          </form>
          <article className="p-6 text-base shadow-xl rounded-lg  ">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold"><img
                  className="mr-2 w-6 h-6 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                  alt="Michael Gough" />Michael Gough</p>
                <p className="text-sm text-gray-600 "><time pubdate datetime="2022-02-08"
                  title="February 8th, 2022">Feb. 8, 2022</time></p>
              </div>
            </footer>
            <p className="text-gray-500 ">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
              instruments for the UX designers. The knowledge of the design tools are as important as the
              creation of the design strategy.</p>
            <div className="flex items-center mt-4 space-x-4">
              <button type="button"
                className="flex items-center text-sm text-gray-500 hover:underline  font-medium">
                <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                </svg>
                Trả lời
              </button>
              <button type="button"
                className="flex items-center text-sm text-gray-500 hover:underline  font-medium">
                <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                </svg>
                Báo cáo
              </button>
            </div>
          </article>
          <article className="p-6 mb-3 ml-6 lg:ml-12 text-base shadow-lg rounded-lg  ">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900   font-semibold"><img
                  className="mr-2 w-6 h-6 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="Jese Leos" />Jese Leos</p>
                <p className="text-sm text-gray-600 "><time pubdate datetime="2022-02-12"
                  title="February 12th, 2022">Feb. 12, 2022</time></p>
              </div>
            </footer>
            <p className="text-gray-500 ">Much appreciated! Glad you liked it ☺️</p>
            <div className="flex items-center mt-4 space-x-4">
              <button type="button"
                className="flex items-center text-sm text-gray-500 hover:underline font-medium">
                <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                </svg>
                Reply
              </button>
            </div>
          </article>
        </div>
      </section>
    </>
  )


}
