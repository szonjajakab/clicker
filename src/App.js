import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider, useGame } from './contexts/GameContext';
import GamePage from './pages/GamePage';
import StartPage from './pages/StartPage';
import AdminPage from './pages/AdminPage';
// We'll implement AdminPage later
// import AdminPage from './pages/AdminPage';

function AppRoutes() {
  const { nickname } = useGame();

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={nickname ? <Navigate to="/game" /> : <StartPage />} 
        />
        <Route 
          path="/game" 
          element={nickname ? <GamePage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin" 
          element={<AdminPage />} 
        />
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