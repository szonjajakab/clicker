import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import GamePage from './pages/GamePage';
import StartPage from './pages/StartPage';
import AdminPage from './pages/AdminPage';
// We'll implement AdminPage later
// import AdminPage from './pages/AdminPage';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <GameProvider>
      <AppRoutes />
    </GameProvider>
  );
}

export default App;