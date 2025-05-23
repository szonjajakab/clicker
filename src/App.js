import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider, useGame } from './contexts/GameContext';
import GamePage from './pages/GamePage';
import UserSetup from './components/UserSetup';
// We'll implement AdminPage later
// import AdminPage from './pages/AdminPage';

function AppRoutes() {
  const { nickname, avatar } = useGame();
  if (!nickname || !avatar) {
    return <UserSetup />;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GamePage />} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
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