import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import socket from "../socket/socket"; // ⚠️ check path (important)

const SocketContext = createContext();

export function SocketProvider({ children }) {

  const [connected, setConnected] = useState(false);

  useEffect(() => {

    if (!socket) return;

    const onConnect = () => {
      setConnected(true);
      console.log("Socket Connected:", socket.id);
    };

    const onDisconnect = () => {
      setConnected(false);
    };

    socket.connect();

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };

  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}