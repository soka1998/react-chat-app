import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Join from './components/Join';
import Chat from './components/Chat';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Join" element={<Join/>} />
      <Route path="/Chat" element={<Chat/>} />
      </Routes>
      </Router>
  );
}

export default App;
