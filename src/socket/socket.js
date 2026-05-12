import { io } from "socket.io-client";

const socket = io(
  "https://nerabybackend-3.onrender.com",
  {
    autoConnect: false,
    transports: ["websocket"]
  }
);

export default socket;