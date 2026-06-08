const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Import routes
const authRoutes = require('./routes/auth');
const playerRoutes = require('./routes/players');
const teamRoutes = require('./routes/teams');
const gameRoutes = require('./routes/games');
const seasonRoutes = require('./routes/seasons');
const careerRoutes = require('./routes/career');
const broadcastRoutes = require('./routes/broadcast');
const statsRoutes = require('./routes/stats');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/seasons', seasonRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/broadcast', broadcastRoutes);
app.use('/api/stats', statsRoutes);

// Initialize database
const { initializeDatabase } = require('./database/db');
initializeDatabase();

// Import game engine
const BroadcastGameEngine = require('./game/broadcastGameEngine');
const gameEngine = new BroadcastGameEngine(io);

// Store active games and broadcast rooms
const activeGames = new Map();
const broadcastRooms = new Map();

// Socket.io events
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Broadcast viewer connection
  socket.on('join_broadcast', (data) => {
    const { gameId, username } = data;
    socket.join(`broadcast_${gameId}`);
    const roomSize = io.sockets.adapter.rooms.get(`broadcast_${gameId}`)?.size || 0;
    
    io.to(`broadcast_${gameId}`).emit('viewer_count', { 
      count: roomSize,
      message: `${username} joined the broadcast`
    });
  });

  // Player gameplay events
  socket.on('join_game', (data) => {
    const game = gameEngine.joinGame(socket, data);
    activeGames.set(socket.id, data.gameId);
    socket.join(`game_${data.gameId}`);
    
    // Broadcast to viewers
    io.to(`broadcast_${data.gameId}`).emit('game_state_update', game);
  });

  socket.on('player_move', (data) => {
    const gameState = gameEngine.handlePlayerMove(socket.id, data);
    if (gameState) {
      io.to(`game_${data.gameId}`).emit('game_state', gameState);
      io.to(`broadcast_${data.gameId}`).emit('game_broadcast', gameState);
    }
  });

  socket.on('player_action', (data) => {
    const result = gameEngine.handlePlayerAction(socket.id, data);
    if (result) {
      io.to(`game_${data.gameId}`).emit('game_state', result.gameState);
      io.to(`broadcast_${data.gameId}`).emit('play_event', {
        type: result.eventType,
        player: result.player,
        description: result.description,
        timestamp: new Date()
      });
    }
  });

  socket.on('leave_game', (data) => {
    gameEngine.leaveGame(socket.id);
    activeGames.delete(socket.id);
  });

  socket.on('disconnect', () => {
    gameEngine.leaveGame(socket.id);
    activeGames.delete(socket.id);
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🏒 NHL 26 Broadcast Game Server running on port ${PORT}`);
});

module.exports = { app, server, io };
