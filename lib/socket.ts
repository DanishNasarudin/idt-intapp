import { io } from "socket.io-client";

const hostname =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5051"
    : "https://intapi.idealtech.com.my";

const socket = io(`${hostname}`);

export default socket;
