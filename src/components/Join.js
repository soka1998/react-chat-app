import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from '../components/Chat';


const Join = ({socket}) => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const navigate = useNavigate();


    const handleInputChange = (event) => {
        setUsername(event.target.value);
    };

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <div className="bg-red-200 min-h-screen flex flex-col items-center justify-center">
            {!showChat ? (
                <div className="bg-amber-100 container mx-auto text-center p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-4">Sélectionnez votre pseudonyme</h1>
                    <input
                        type="text"
                        placeholder="Votre pseudonyme"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                        className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Room ID..."
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                        className="border border-gray-300 px-3 py-2 mb-3 rounded-md w-full"
                    />
                    <button onClick={joinRoom} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                        Rejoindre le Chat
                    </button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </div>
    );
};

export default Join;
