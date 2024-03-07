import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const location = useLocation();
    const username = new URLSearchParams(location.search).get('username');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim() !== '') {
            setMessages([...messages, { author: username, content: newMessage }]);
            setNewMessage('');
        }
    };

    useEffect(() => {
        // Scroll to bottom of chat when new message is added
        const chatContainer = document.getElementById('chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [messages]);

    return (
        <div className="bg-red-200 min-h-screen flex flex-col items-center justify-center">
            <div className="bg-amber-100 container mx-auto p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Salle de Chat</h1>
                <div id="chat-container" className="border border-gray-400 rounded-lg p-4 h-64 overflow-y-auto mb-4">
                    {messages.map((message, index) => (
                        <div key={index} className="mb-2">
                            <span className="font-bold">{message.author}:</span> {message.content}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="flex justify-center">
                    <input
                        type="text"
                        placeholder="Votre message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="border border-gray-400 rounded-lg px-4 py-2 mr-2 w-64"
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Envoyer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
