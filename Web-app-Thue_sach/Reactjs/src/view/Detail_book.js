import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { detailBookUser } from '../Service/UserService';



export default function Detail_book() {

  const [detail, setDetail] = useState();

  let { id } = useParams();

  useEffect(() => {
    detailBook();
  }, [])

  const detailBook = async () => {
    let data = await detailBookUser(id)
    setDetail(data.data)


  }
  console.log("check id:", id);
  console.log("check detail:", detail);


  const addToCart = () => {

  }

  return (
    <>
      <div className="container mx-auto my-8 flex">
        {/* Hình ảnh sách bên trái */}
        <div className="w-1/2 pr-8">
          <img
            src={`http://localhost:8000/img/${detail.hinh}`}
            alt={detail.hinh}
            className="w-full h-auto rounded"
          />
        </div>

        {/* Phần chi tiết sách (bao gồm phần bình luận) bên phải */}
        <div className="w-1/2">
          <h2 className="text-3xl font-bold mb-4">{detail.ten}</h2>
          <p className="text-gray-700 mb-4">
            {detail.noidung}
          </p>
          <div className="mb-4">
            <strong>Tac gia:</strong> {detail.tentacgia}
          </div>
          <div className="mb-4">
            <strong>The loai:</strong> {detail.theloai}
          </div>
          <div className="mb-4">
            <strong>Gia thue:</strong> {detail.gia}
          </div>
          <div className="mb-4">
            <strong>Tien coc:</strong> {detail.tiencoc}
          </div>
          <div className="mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={addToCart}
            >
              Add to Cart
            </button>

          </div>
        </div>
      </div>
      <div class="grid gap-6 text-center md:grid-cols-3 lg:gap-12">
        <div class="mb-12 md:mb-0">
          <div class="mb-6 flex justify-center">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg"
              class="w-32 rounded-full shadow-lg dark:shadow-black/30" />
          </div>
          <h5 class="mb-4 text-xl font-semibold">Maria Smantha</h5>
          <h6 class="mb-4 font-semibold text-primary dark:text-primary-500">
            Web Developer
          </h6>
          <p class="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="inline-block h-7 w-7 pr-2"
              viewBox="0 0 24 24">
              <path
                d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
            </svg>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos
            id officiis hic tenetur quae quaerat ad velit ab hic tenetur.
          </p>
        </div>

      </div>
    </>
  )


}
