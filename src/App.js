import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Join from './components/Join';
import Chat from './components/Chat';
import { io } from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home socket={socket} />}/>
      <Route path="/Join" element={<Join socket={socket} />} />
      <Route path="/Chat" element={<Chat socket={socket} />} />
      </Routes>
      </Router>
  );
}

export default App;
