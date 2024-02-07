import { NextAPIResponseServerIo } from "@/lib/types";
import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import { NextApiRequest } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextAPIResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log("a user connected");
      socket.on("lock-row", (lock) => {
        socket.broadcast.emit("lock-row", lock);
        // console.log(lock, "lock");
      });
      socket.on("unlock-row", (lock) => {
        socket.broadcast.emit("unlock-row", lock);
        // console.log(lock, "unlock");
      });
      socket.on("unlock-row", (lock) => {
        socket.broadcast.emit("unlock-row", lock);
        // console.log(lock, "unlock");
      });
      socket.on("unlock-row-all", (lock) => {
        socket.broadcast.emit("unlock-row-all", lock);
        // console.log(lock, "unlock");
      });
      socket.on("re-render", (string) => {
        socket.broadcast.emit("re-render", string);
        // console.log(string, "re-render");
      });
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
