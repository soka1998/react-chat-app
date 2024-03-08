import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';




// const socket = io('http://localhost:3000')
const Chat = ({ socket, username, room }) => {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);


    const location = useLocation();
    // const queryUsername = new URLSearchParams(location.search).get('username');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage.trim() !== '') {
            const currentTime = `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`;
            const messageData = {
                room: room,
                author: username,
                message: newMessage,
                time: currentTime
            };
            try {
                await socket.emit("send_message", messageData);
                setMessages([...messages, messageData]); // Update messages state
                setNewMessage('');
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };



    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]); // Concatenate new messages with existing ones
        });

        // Scroll to bottom of chat when new message is added
        const chatContainer = document.getElementById('chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Clean up function to remove event listener when component unmounts
        return () => {
            socket.off("receive_message");
        };
    }, [socket]);

    return (
        <div className="bg-red-200 min-h-screen flex flex-col items-center justify-center">
            <div className="bg-amber-100 container mx-auto p-8 rounded-lg shadow-[#555] shadow-lg">
                <h1 className="text-3xl font-bold mb-4">Salle de Chat</h1>
                <div id="chat-container" className="border border-gray-400 rounded-lg p-4 h-64 overflow-y-auto mb-4 " >
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-2 ${username === message.author ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'}`}
                            style={{ borderRadius: '10px', padding: '8px' }}
                        >
                            <span className={`font-bold ${username === message.author ? 'text-blue-900' : 'text-gray-900'}`}>
                                <span className="funny-name">{message.author}</span>:
                            </span> {message.message}
                            <span className="ml-2 text-gray-500">{message.time}</span> {/* Display time */}
                        </div>



                    ))}
                </div>
                <form className="flex justify-center">
                    <input
                        type="text"
                        placeholder="Votre message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="border border-gray-400 rounded-lg px-4 py-2 mr-2 w-64"
                    />
                    <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Envoyer &#9658;
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
