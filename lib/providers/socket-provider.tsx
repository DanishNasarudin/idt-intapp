"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
  isOutdated: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  isOutdated: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

// const hostname =
//   process.env.NODE_ENV !== "production"
//     ? "http://localhost:3000"
//     : "https://app.idealtech.com.my";

const hostname = "http://localhost:3000";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isOutdated, setIsOutdated] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(hostname, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });
    socketInstance.on("connect", () => {
      setIsConnected(true);
    });
    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });
    socketInstance.on("connect_error", (err: any) => {
      console.log(err.message);
      console.log(err.description);
      console.log(err.context);
      setTimeout(() => {
        socketInstance.connect();
      }, 1000);
    });

    const clientVersion = process.env.NEXT_PUBLIC_APP_VERSION;

    socketInstance.on("version-check", (data: any) => {
      // console.log("Server version: ", data.serverVersion, clientVersion);
      socketInstance.emit("client-version", { clientVersion });
    });

    socketInstance.on("refresh-client", () => {
      setIsOutdated(true);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, isOutdated }}>
      {children}
    </SocketContext.Provider>
  );
};
