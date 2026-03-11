import { Server } from "socket.io";
import { Socket } from "socket.io";
import { saveMessage } from "./helper.js";

interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;

    if (!room) {
      return next(new Error("Invalid room"));
    }
    socket.room = room;

    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    console.log("A user connected with id: ", socket.id);

    if (socket.room) {
      socket.join(socket.room);
    }

    socket.on("message", async (data) => {
      console.log("The socket message is:", data);

      try {
        await saveMessage({
          ...data,
          group_id: socket.room!,
        });

        socket.to(socket.room!).emit("message", data);
      } catch (err) {
        console.error("Failed to save message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected with id: ", socket.id);
    });
  });
}
