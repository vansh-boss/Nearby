import { io } from "socket.io-client";

const socket = io(
  "https://nerabybackend-6.onrender.com/",
  {
    autoConnect: false,
    transports: ["websocket"]
  }
);

export default socket;