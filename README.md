# 🏒 G's NHL 26 BRAWL

A professional 2D HTTP-based 3v3 multiplayer hockey game featuring **real NHL teams and rosters**, broadcast streaming, and multiple game modes inspired by EA's NHL 26.

**🎵 Theme Song: Flower Day Funk**

## 🎮 Features

### Game Modes
- **Exhibition**: Quick 3v3 matches with any NHL roster
- **Season**: Full season progression with standings and statistics
- **Playoff**: Single-elimination tournament bracket
- **HUT**: Hockey Ultimate Team mode

### Broadcast System
- 🔴 **Live Broadcasting**: Stream games to multiple viewers
- 📊 **Real-time Stats**: Live score updates and play-by-play commentary
- 👥 **Viewer Tracking**: See live viewer counts
- 🎙️ **Play-by-Play Events**: Goals, assists, checks, and saves

### NHL Features
- ✅ **32 Real NHL Teams** with accurate divisions and conferences
- ✅ **NHL Player Database** with top stars from each team
- 🎨 **Team Customization**: Create custom rosters from NHL players
- 📈 **Player Stats**: Speed, strength, shooting, passing, awareness ratings
- 🏆 **Career Statistics**: Track career goals, assists, and performance

### Gameplay Mechanics
- ⚡ **Realistic Physics**: Puck dynamics, player momentum, stamina system
- 🎯 **Skill-based Actions**: Shooting, passing, body checking
- 🛡️ **Defensive Play**: Checking mechanics and positioning
- ⚙️ **Dynamic Stamina**: Players tire with extended play

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/GSe1234/Hockey-Game.git
cd Hockey-Game

# Backend setup
cd server
npm install
npm start
# Runs on http://localhost:5000

# Frontend setup (in new terminal)
cd client
npm install
npm run dev
# Runs on http://localhost:3000
```

## 📡 API Endpoints

### Authentication
```http
POST   /api/auth/register          # Register new account
POST   /api/auth/login             # Login
```

### NHL Data
```http
GET    /api/teams/nhl-teams        # Get all 32 NHL teams
GET    /api/teams/nhl-teams/:id/roster  # Get team roster
GET    /api/teams/nhl-players/search    # Search NHL players
POST   /api/teams                  # Create user team
GET    /api/teams                  # Get user's teams
GET    /api/teams/:id              # Get team with roster
POST   /api/teams/:id/add-player   # Add NHL player to team
DELETE /api/teams/:id/players/:pid # Remove player from team
```

### Games & Broadcasting
```http
POST   /api/games                  # Create new game
GET    /api/games/:id              # Get game details
PUT    /api/games/:id/start        # Start game broadcast
PUT    /api/games/:id/score        # Update score
PUT    /api/games/:id/end          # End game
POST   /api/games/:id/event        # Record play event

GET    /api/broadcast/live         # Get live games
GET    /api/broadcast/scheduled    # Get upcoming games
GET    /api/broadcast/games/:id    # Get broadcast details
GET    /api/broadcast/games/:id/viewers # Get viewer list
POST   /api/broadcast/games/:id/viewer  # Join broadcast
GET    /api/broadcast/stats/highlights  # Get broadcast highlights
```

### Statistics & Career
```http
GET    /api/stats/games/:id        # Get game statistics
GET    /api/stats/player/:id/career    # Get player career stats
GET    /api/stats/player/:id/game/:gid # Get player game stats
GET    /api/stats/teams/:id        # Get team statistics
GET    /api/stats/seasons/:id      # Get season standings
```

### Seasons
```http
POST   /api/seasons                # Create season
GET    /api/seasons                # Get all seasons
GET    /api/seasons/:id            # Get season details
PUT    /api/seasons/:id/stats      # Update season stats
```

## 🔌 WebSocket Events

### Join Game
```javascript
socket.emit('join_game', {
  gameId: 1,
  teamId: 'home',
  playerId: 88,
  playerName: 'David Pastrnak'
});
```

### Player Movement
```javascript
socket.emit('player_move', {
  gameId: 1,
  direction: 'right',  // up, down, left, right
  speed: 5
});
```

### Player Actions
```javascript
socket.emit('player_action', {
  gameId: 1,
  action: 'shoot',  // shoot, pass, check
  targetPlayerId: null
});
```

### Join Broadcast
```javascript
socket.emit('join_broadcast', {
  gameId: 1,
  username: 'NHL Fan'
});
```

### Listen for Events
```javascript
socket.on('game_state', (gameState) => {
  // Update game display
});

socket.on('play_event', (event) => {
  // Display goal, assist, etc
});

socket.on('viewer_count', (data) => {
  // Update viewer count
});
```

## 📊 Database Schema

### Core Tables
- `users` - User accounts
- `nhl_teams` - 32 NHL teams
- `nhl_players` - NHL player database
- `user_teams` - Custom teams created by users
- `user_team_players` - Rosters (3v3)
- `games` - Game instances
- `broadcast_events` - Play-by-play events

### Statistics
- `career_stats` - Career statistics per player
- `broadcast_viewers` - Broadcast viewership tracking

## 📁 Project Structure

```
Hockey-Game/
├── server/
│   ├── index.js                    # Express + Socket.io server
│   ├── game/
│   │   └── broadcastGameEngine.js  # Game logic
│   ├── database/
│   │   └── db.js                   # SQLite setup
│   ├── routes/
│   │   ├── auth.js                 # Authentication
│   │   ├── teams.js                # Team management
│   │   ├── games.js                # Game management
│   │   ├── broadcast.js            # Broadcasting
│   │   ├── players.js              # Player management
│   │   ├── seasons.js              # Season management
│   │   ├── career.js               # Career stats
│   │   └── stats.js                # Statistics
│   ├── data/
│   │   └── nhlData.js              # NHL teams & players
│   ├── scripts/
│   │   └── seedNHLRosters.js       # Database seeding
│   └── middleware/
│       └── auth.js                 # JWT authentication
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MainMenu.jsx        # G's NHL 26 BRAWL main menu
│   │   │   └── MainMenu.css        # Menu styling
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── data/
│   └── nhl-game.db                # SQLite database
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 🎮 Game Controls (In Development)

- **Arrow Keys**: Move player
- **Space**: Shoot
- **E**: Pass
- **R**: Body Check
- **Escape**: Pause

## 🎵 Audio

**Main Menu Theme:** Flower Day Funk

## 🎯 Upcoming Features

- [ ] Advanced AI opponent
- [ ] Multiplayer lobbies
- [ ] Enhanced team customization UI
- [ ] Live broadcast viewer interface
- [ ] Mobile responsive gameplay
- [ ] Achievement system
- [ ] Leaderboards
- [ ] Real-time commentary AI
- [ ] Replay system
- [ ] Challenge mode

## 🛠️ Development

### Seed Database
```bash
npm run seed
```

### Run Development
```bash
npm run dev
```

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📝 Environment Variables

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
DATABASE_PATH=./data/nhl-game.db
```

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🙋 Support

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ for hockey fans and gamers**

**G's NHL 26 BRAWL** - Where Hockey Meets Competition 🏒🔥

⭐ Star this repo if you love hockey games!
