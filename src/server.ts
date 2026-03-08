import "dotenv/config";
import http from "http";
import { Server } from "socket.io";

import app from "./app";
import { initChatSocket } from "./sockets/chat.socket";

const PORT = process.env.PORT || 4000;

/// Create HTTP server
const server = http.createServer(app);

/// Create socket server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

/// Initialize chat socket
initChatSocket(io);

server.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});