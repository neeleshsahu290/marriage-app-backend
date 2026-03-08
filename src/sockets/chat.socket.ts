import { Server, Socket } from "socket.io";
import { saveMessage } from "../services/message.service";

export const initChatSocket = (io: Server) => {

  io.on("connection", (socket: Socket) => {

    console.log("🔌 User connected:", socket.id);

    /// Join conversation
    socket.on("join", (conversationId: string) => {
      socket.join(conversationId);
    });

    /// Send message
    socket.on("send_message", async (data) => {

      const { conversationId, senderId, message } = data;

      try {

        const savedMessage = await saveMessage(
          conversationId,
          senderId,
          message
        );

        io.to(conversationId).emit("receive_message", savedMessage);

      } catch (err) {
        console.error("❌ Chat error:", err);
      }

    });

    socket.on("disconnect", () => {
      console.log("⚡ User disconnected:", socket.id);
    });

  });

};