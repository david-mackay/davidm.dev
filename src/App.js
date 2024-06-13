// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Web3Page from './pages/Web3Page';
import FullStackPage from './pages/FullStackPage';
import PokerPage from './pages/PokerPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/web3" element={<Web3Page />} />
        <Route path="/fullstack" element={<FullStackPage />} />
        <Route path="/poker" element={<PokerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
