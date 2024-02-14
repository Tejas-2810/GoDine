import './App.css';
import React from 'react';
import Profile from './views/profile/profile';
import Home from './views/home/home';
import Navbar from './components/navbar/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='main'>
      <Router>
        <Navbar className="nav" />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
