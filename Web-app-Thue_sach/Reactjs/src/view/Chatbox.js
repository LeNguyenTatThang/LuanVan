import React, { useState, useEffect } from 'react';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [renters, setRenters] = useState([]);

    useEffect(() => {
        // Lấy tin nhắn từ cơ chế lưu trữ cục bộ khi component được render
        const storedMessages = localStorage.getItem('chatMessages');
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }

        // Lấy danh sách người thuê từ cơ chế lưu trữ cục bộ khi component được render
        const storedRenters = localStorage.getItem('renters');
        if (storedRenters) {
            setRenters(JSON.parse(storedRenters));
        }
    }, []);

    useEffect(() => {
        // Lưu tin nhắn vào cơ chế lưu trữ cục bộ mỗi khi tin nhắn thay đổi
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        // Lưu danh sách người thuê vào cơ chế lưu trữ cục bộ mỗi khi danh sách thay đổi
        localStorage.setItem('renters', JSON.stringify(renters));
    }, [renters]);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        // Xử lý thông báo khi có người thuê sách
        if (newMessage.toLowerCase().includes('thuê sách')) {
            const renterName = newMessage.split(' ')[0];
            setRenters([...renters, renterName]);
            setMessages([...messages, { content: `Đã nhận yêu cầu thuê sách từ ${renterName}`, sender: 'admin' }]);
        } else {
            // Xử lý thông điệp bình thường
            setMessages([...messages, { content: newMessage, sender: 'user' }]);
        }

        setNewMessage('');
    };

    return (
        <div className="bg-gray-200 p-4">
            <div className="h-64 overflow-y-auto border mb-4">
                {messages.map((message, index) => (
                    <div key={index} className={message.sender === 'user' ? 'text-right' : ''}>
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 border p-2 rounded"
                />
                <button onClick={handleSendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded">
                    Gửi
                </button>
            </div>
            <div className="mt-2">
                <h2 className="text-lg font-bold">Người Đang Thuê Sách:</h2>
                <ul>
                    {renters.map((renter, index) => (
                        <li key={index}>{renter}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ChatBox;
