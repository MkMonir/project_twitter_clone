const http = require('http');
const dotenv = require('dotenv');
const socketio = require('socket.io');
const Database = require('./utils/database');

const app = require('./app');
const server = http.createServer(app);
const io = socketio(server);

dotenv.config({ path: './config.env' });

// DATABASE CONNECTION
const mongodbConnection = new Database();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server successfully running on port ${PORT}`));
