import React, { useState } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentUser, setCurrentUser] = useState({ id: 1, name: 'User 1', avatar: 'avatar1.jpg' });
    const [chattingWith, setChattingWith] = useState({ id: 2, name: 'User 2', avatar: 'avatar2.jpg' });

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            setMessages([...messages, { text: newMessage, sender: currentUser }]);
            setNewMessage('');
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar với danh sách người dùng */}
            <div className="w-1/4 bg-gray-200 p-4">
                <h2 className="text-lg font-semibold mb-4">Danh sách người dùng</h2>
                <ul>
                    <li
                        className={`cursor-pointer ${currentUser.id === 1 ? 'font-bold' : ''}`}
                        onClick={() => setCurrentUser({ id: 1, name: 'User 1', avatar: 'avatar1.jpg' })}
                    >
                        <div className="flex items-center">
                            <img
                                src={currentUser.avatar}
                                alt={currentUser.name}
                                className="w-6 h-6 rounded-full mr-2"
                            />
                            <span>{currentUser.name}</span>
                        </div>
                    </li>
                    <li
                        className={`cursor-pointer ${currentUser.id === 2 ? 'font-bold' : ''}`}
                        onClick={() => setCurrentUser({ id: 2, name: 'User 2', avatar: 'avatar2.jpg' })}
                    ><div className="flex items-center">
                            <img
                                src={chattingWith.avatar}
                                alt={chattingWith.name}
                                className="w-6 h-6 rounded-full mr-2"
                            />
                            <span>{chattingWith.name}</span>
                        </div>

                    </li>
                </ul>
            </div>

            {/* Nội dung chính với các tin nhắn */}
            <div className="flex-1 p-4">
                <div className="bg-white p-4 h-5/6 overflow-y-auto">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.sender.id === currentUser.id ? 'justify-end' : 'justify-start'} mb-2`}
                        >
                            <div className={`flex items-center p-3 max-w-xs rounded-lg ${message.sender.id === currentUser.id ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                }`}>
                                <img
                                    src={message.sender.avatar}
                                    alt={message.sender.name}
                                    className="w-6 h-6 rounded-full mr-2"
                                />
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input để gửi tin nhắn */}
                <div className="mt-4 flex">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        className="w-full border p-2 rounded"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-2 bg-blue-500 text-white p-2 rounded"
                    >
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
