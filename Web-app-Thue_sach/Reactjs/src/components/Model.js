import React, { useEffect, useState } from 'react'
import { detailBookUser } from '../Service/UserService';

// ... (other imports)

const Model = ({ data, onClose }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [modalBookId, setModalBookId] = React.useState(null)
    const [detail, setDetail] = useState([]);
    useEffect(() => {
        handleEditInfo();
        const handleEditInfo = async (bookId) => {
            // Sử dụng hook để đặt giá trị id vào state
            setModalBookId(bookId);
            try {
                let data = await detailBookUser(bookId);
                if (data && data.status === 200) {
                    setDetail(data.data);
                }

            } catch (error) {
                console.error('Error fetching book details:', error);
            }
            // Hiển thị modal
            setShowModal(true);
        }

    }, [data]); // Depend on the 'data' variable

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div className="your-modal-styles">
            {/* Render data in your modal */}
            {data.map((value, index) => (
                <div key={index}>
                    <div className="flex items-center space-x-4">
                        <img
                            src={`http://localhost:8000/img/${JSON.stringify(value.hinh)}`}
                            alt={`${JSON.stringify(value.hinh)}`}
                            className="w-16 h-16 rounded-full"
                        />
                        <div>
                            <p className="text-xl font-bold">{JSON.stringify(value.ten)}</p>
                            <p className="text-gray-600">{JSON.stringify(value.tentacgia)}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p>
                            <span className="font-bold">Giá:</span> {JSON.stringify(value.gia)}
                        </p>
                        <p>
                            <span className="font-bold">Giá cọc:</span> {JSON.stringify(value.giacoc)}
                        </p>
                        <p>
                            <span className="font-bold">Trạng thái sách:</span> {JSON.stringify(value.trangthai)}
                        </p>
                    </div>
                </div>
            ))}
            {/* Close button or any other controls */}
            <button onClick={onClose}>Close Modal</button>
        </div>
    );
};

export default Model;

