import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    const handleJoinChat = () => {
        if (username.trim() !== '') {
            navigate(`/chat?username=${username}`);
        } else {
            // Handle case where username is empty
            alert('Please enter a valid username');
        }
    };

    return (
        <div className="bg-red-200 min-h-screen flex flex-col items-center justify-center">
            <div className="bg-amber-100 container mx-auto text-center p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Sélectionnez votre pseudonyme</h1>
                <input
                    type="text"
                    placeholder="Votre pseudonyme"
                    value={username}
                    onChange={handleInputChange}
                    className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full"
                />
                <button onClick={handleJoinChat} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                    Rejoindre le Chat
                </button>
            </div>
        </div>
    );
};

export default Join;
