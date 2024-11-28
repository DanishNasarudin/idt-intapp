"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { io as ClientIO, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type SocketContextType = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | any | null;
  isConnected: boolean;
  isOutdated: boolean;
  isFocus: boolean;
  setIsFocus: Dispatch<SetStateAction<boolean>>;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  isOutdated: false,
  isFocus: false,
  setIsFocus: () => {},
});

export const useSocket = () => {
  return useContext(SocketContext);
};

const hostname =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://app.idealtech.com.my";

// const hostname = "http://localhost:3000";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isOutdated, setIsOutdated] = useState(false);
  const [socketId, setSocketId] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const socketInstance = ClientIO(hostname, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });
    socketInstance.on("connect", () => {
      setIsConnected(true);
      setSocketId(socketInstance.id !== undefined ? socketInstance.id : "");
      // console.log(socketInstance.id, "CHECKCCSS");
    });
    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });
    socketInstance.on("connect_error", (err: any) => {
      // console.log(err.message);
      // console.log(err.description);
      // console.log(err.context);
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

  useEffect(() => {
    if (socket === null) return;
    if (typeof window !== "undefined") {
      const activeId = window.localStorage.getItem("activeSocket");
      // console.log(activeId, "CHECK");
      if (activeId === "" && socketId !== "") {
        window.localStorage.setItem("activeSocket", socketId);
      } else {
        socket.emit("clear-client", { activeSocket: activeId });
        window.localStorage.setItem("activeSocket", socketId);
      }
    }
  }, [socketId]);

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, isOutdated, isFocus, setIsFocus }}
    >
      {children}
    </SocketContext.Provider>
  );
};
