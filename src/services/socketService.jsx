import { io } from 'socket.io-client';

// Set this to your backend server URL
const SOCKET_SERVER_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-server.com' 
  : 'http://localhost:3001';

export const initializeSocket = (sessionId) => {
  const socket = io(SOCKET_SERVER_URL, {
    query: { sessionId },
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('Connected to socket server');
    
    // Send initial connection info
    socket.emit('playerJoined', { sessionId });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
  });

  socket.on('resetScore', () => {
    // This can be handled by dispatching an event
    window.dispatchEvent(new CustomEvent('resetScore'));
  });

  return socket;
};