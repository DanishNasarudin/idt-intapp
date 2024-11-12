import { updateData } from "@/services/common/FetchDB";
import { NextAPIResponseServerIo } from "@/lib/types";
import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

type RowLocks = {
  [rowId: string]: number;
};

type UserLocks = {
  [socketId: string]: Set<string>;
};

const ioHandler = (req: NextApiRequest, res: NextAPIResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/proxy/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false,
    });

    const rowLocks: RowLocks = {};
    const userLocks: UserLocks = {};

    io.on("connection", (socket) => {
      function handleUserDisconnect(socketId: string, dataTable: string) {
        // console.log(userLocks);
        const lockedRows = userLocks[socketId];
        if (lockedRows) {
          lockedRows.forEach((rowId) => {
            rowLocks[rowId] = (rowLocks[rowId] || 1) - 1; // Ensure at least 1 before decrementing
            if (rowLocks[rowId] <= 0) {
              delete rowLocks[rowId];
              userLocks[socket.id].delete(rowId);
              // Broadcast to all users that the row is now unlocked
              io.emit("lock-row-state", { rowId, isLocked: false });
              updateData(dataTable, rowId, "locker", "0");
              console.log("handle user disconnect");
              // io.to(socket.id).emit("lock-row", {
              //   rowId,
              //   isLocked: false,
              //   multiLock: true,
              // });
            }
          });
          delete userLocks[socketId]; // Clean up user locks
        }
      }

      function handleUserPageChange(socketId: string, dataTable: string) {
        const lockedRows = userLocks[socketId];
        if (lockedRows) {
          lockedRows.forEach((rowId) => {
            rowLocks[rowId] = (rowLocks[rowId] || 1) - 1; // Ensure at least 1 before decrementing
            if (rowLocks[rowId] <= 0) {
              // console.log(rowId);
              delete rowLocks[rowId];
              userLocks[socket.id].delete(rowId);
              // Broadcast to all users that the row is now unlocked
              io.emit("lock-row-state", { rowId, isLocked: false });
              updateData(dataTable, rowId, "locker", "0");
              console.log("page change");
              // io.to(socket.id).emit("lock-row", {
              //   rowId,
              //   isLocked: false,
              //   multiLock: true,
              // });
            }
          });
          // delete userLocks[socketId]; // Clean up user locks
        }
      }

      // console.log(`user connected ${socket.id}`);
      console.log(`user connected`);
      userLocks[socket.id] = new Set();

      socket.on("lock-row", (lock) => {
        const { rowId, count } = lock;
        if (!rowLocks[rowId]) {
          rowLocks[rowId] = 0;
          io.to(socket.id).emit("lock-row", {
            rowId,
            isLocked: true,
            multiLock: false,
          });
        }
        rowLocks[rowId] += count;
        const isLocked = rowLocks[rowId] > 0;
        userLocks[socket.id].add(rowId);

        // console.log(rowLocks, rowId, isLocked, "lock");

        io.emit("lock-row-state", { rowId, isLocked });
        // console.log(lock, "lock");
      });
      socket.on("unlock-row", (lock) => {
        const { rowId, count } = lock;
        rowLocks[rowId] += count;
        const isLocked = rowLocks[rowId] > 0;
        userLocks[socket.id].delete(rowId);

        // console.log(rowLocks, rowId, isLocked, "unlock");

        io.emit("lock-row-state", { rowId, isLocked });
        if (!isLocked) {
          delete rowLocks[rowId];
          io.to(socket.id).emit("lock-row", {
            rowId,
            isLocked: false,
            multiLock: false,
          });
        }
        // console.log(rowLocks, rowId, isLocked, "unlock after");
        // console.log(lock, "unlock");
      });

      socket.on("pre-disconnect", (data) => {
        const { dataTable } = data;
        // console.log(`user disconnected ${socket.id}`);
        handleUserDisconnect(socket.id, dataTable);
      });

      socket.on("unlock-row-all", (data) => {
        const { dataTable } = data;
        // socket.broadcast.emit("unlock-row-all", lock);
        handleUserPageChange(socket.id, dataTable);
        // console.log(lock);
      });
      socket.on("input-change", (change) => {
        socket.broadcast.emit("input-change", change);
        // console.log(change);
      });
      socket.on("new-entry", (newE) => {
        socket.broadcast.emit("new-entry", newE);
        // console.log(newE);
      });
      socket.on("del-entry", (delE) => {
        socket.broadcast.emit("del-entry", delE);
        // console.log(newE);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
