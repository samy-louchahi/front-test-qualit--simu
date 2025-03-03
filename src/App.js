// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ChooseFilePage from './pages/ChooseFilePage';
import SimulationPage from './pages/SimulationPage';
import './styles/global.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/choose" element={<ChooseFilePage />} />
        <Route path="/simulation" element={<SimulationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
