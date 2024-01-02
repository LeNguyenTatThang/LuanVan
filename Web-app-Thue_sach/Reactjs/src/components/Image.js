import React from 'react'
import './imgae.css';
export default function Image() {
    return (
        <div>
            <div className="flex justify-around">

                <div className="card">

                    <div className="face front">
                        <img src="https://st2.depositphotos.com/1053646/6104/i/950/depositphotos_61040615-stock-photo-dubai-downtown-night-scene.jpg" alt="city" />
                        <h1 className="text-h1">Lợi ích thuê sách</h1>
                    </div>

                    <div className="face back">
                        <p className="text-p m-auto">
                            &#x2713; Chi ít hơn, đọc nhiều hơn. <br />
                            &#x2713; Tiết kiệm chi phí.<br />
                            &#x2713; Tạo thói quen đọc sách mỗi ngày.<br />
                            &#x2713; Giảm nỗi lo bảo quản sách.<br />
                            &#x2713; Cách để giữ một khoản tiền dự phòng linh động

                        </p>
                        <div className="links">
                            <a className="link-a" href="#">Follow facebook và tiktok nhé</a>
                        </div>
                    </div>

                </div>

                <div className="card">

                    <div className="face front">
                        <img src="https://static6.depositphotos.com/1018174/582/i/450/depositphotos_5827828-stock-photo-beautiful-view-of-the-old.jpg" alt="city" />
                        <h1 className="text-h1">Về chúng tôi</h1>
                    </div>

                    <div className="face back">
                        <p className="text-p m-auto">
                            Địa chỉ: 180 Cao Lỗ phường 4 quận 8 <br />
                            Số điện thoại: 0367431233<br />
                            Email: thuesach2024@gmail.com
                        </p>
                    </div>

                </div>

                <div className="card">

                    <div className="face front">
                        <img src="https://st4.depositphotos.com/12982378/23133/i/450/depositphotos_231334094-stock-photo-aerial-view-buildings-night-city.jpg" alt="city" />
                        <h1 className="text-h1">Hướng dẫn cơ bản</h1>
                    </div>

                    <div className="face back">

                        <p className="text-p my-auto">
                            <strong>Bước 1:</strong>  Lựa chọn sản phẩm <br />
                            <strong>Bước 2:</strong>  Thanh toán<br />
                            <strong>Bước 3:</strong>  Nhận hàng<br />
                            <strong>Bước 4:</strong>  Trả sách
                        </p>
                        <div className="links">
                            <a className="link-a" href="#">Details</a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
