import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV != "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    // Each client joins a personal room so we can target events per user
    socket.on("join", (userId: string) => {
      socket.join(`user:${userId}`);
    });

    // Relay the new conversation to every member (including the creator,
    // so their other tabs/devices are updated too)
    socket.on(
      "new chat",
      ({ chat, memberIds }: { chat: { createdById: string }; memberIds: string[] }) => {
        const rooms = [...new Set([chat.createdById, ...memberIds])].map(
          (id) => `user:${id}`,
        );

        io.to(rooms).emit("new chat", chat);
      },
    );

    socket.on("disconnect", () => {
      console.log("Disconnected: ", socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
