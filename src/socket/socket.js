import { io } from "socket.io-client";

const socket = io(
  "https://nerabybackend-6.onrender.com",
  {
    autoConnect: true,   // ✅ FIX HERE
    transports: ["websocket"]
  }
);

export default socket;