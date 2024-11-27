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

const serverVersion = process.env.NEXT_PUBLIC_APP_VERSION;

const ioHandler = (req: NextApiRequest, res: NextAPIResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false,
      transports: ["polling"],
    });

    const rowLocks: RowLocks = {};
    const userLocks: UserLocks = {};

    let allClients: { id: any; data: any }[] = [];

    io.on("connection", (socket) => {
      // console.log(allClients, "CHECK TOTAL");
      socket.on("create-edit", (rowId) => {
        // console.log(rowId, "Joined");
        if (!allClients.find((item) => item.id === socket.id))
          allClients.push({ id: socket.id, data: {} });

        socket.join(rowId);
        allClients.forEach((item) => {
          if (
            item.id !== socket.id &&
            Object.keys(item.data).length > 0 &&
            item.data.rowId === rowId
          ) {
            // console.log(item, "CHECK");
            socket.emit("cell-isediting", item.data);
          }
        });
      });
      socket.on("send-changes", (data) => {
        // console.log(data, "CHECK ");
        const { rowId } = data;
        socket.to(rowId).emit("receive-changes", data);
      });

      socket.on("editing-cell", (data) => {
        allClients.forEach((item) => {
          if (
            item.id !== socket.id &&
            Object.keys(item.data).length > 0 &&
            item.data.rowId === data.rowId
          ) {
            socket.emit("cell-isediting", item.data);
          }
        });

        allClients = allClients.map((item) => {
          if (item.id === socket.id) {
            return {
              ...item,
              data: data,
            };
          } else {
            return item;
          }
        });
        const { rowId } = data;
        socket.to(rowId).emit("cell-isediting", data);
      });

      socket.on("revalidate-data", () => {
        socket.broadcast.emit("receive-revalidate");
      });

      socket.on("disconnect", async () => {
        // console.log(socket, "DISCONNECTED!");
        allClients.forEach((item) => {
          if (item.id === socket.id) {
            const { rowId, columnId } = item.data;
            // console.log(item.data, "Delete data");
            io.in(rowId).emit("cell-isediting", {
              rowId,
              columnId,
              isEditing: false,
            });
          }
        });
        allClients = allClients.filter((item) => item.id !== socket.id);
        clearInterval(versionCheckInterval);
        // console.log(allClients, "ARRAY EMPTY WHEN ALL DISCONNECT");
      });

      socket.on("clear-client", (data) => {
        if (allClients.length > 0) {
          if (Object.keys(data).length === 0) return;
          allClients.forEach((item) => {
            if (item.id === data.activeSocket) {
              const { rowId, columnId } = item.data;
              io.in(rowId).emit("cell-isediting", {
                rowId,
                columnId,
                isEditing: false,
              });
            }
          });
          allClients = allClients.filter(
            (item) => item.id !== data.activeSocket
          );
        }
      });

      const versionCheckInterval = setInterval(() => {
        socket.emit("version-check", { serverVersion });
      }, 10000); // 10 secs

      socket.on("client-version", (data) => {
        const { clientVersion } = data;
        if (clientVersion !== serverVersion) {
          socket.emit("refresh-client", {
            message: "Client version is outdated. Please refresh.",
          });
        }
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
