
import React from 'react';
// import Chat from "..components/Chat";
import { Link, useNavigate } from 'react-router-dom';


const Home = ({socket}) => {
 

    const navigate = useNavigate();

    const handleJoinClick = () => {
        navigate('/join');
    };
    

    return (
        <div className="bg-red-200 min-h-screen flex flex-col items-center justify-center">
           
            <div className="bg-amber-100 container mx-auto text-center p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Bienvenue sur ChatSphere</h1>
                <p className="text-lg mb-4">
                    ChatSphere est une plateforme de communication en temps réel qui vous permet de rejoindre différentes salles de chat et de partager des messages instantanément.
                </p>
             <Link to='/join'>
                <button onClick={handleJoinClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Rejoindre le Chat
                </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
