import { useState } from "react";
import axios from "axios";
import { useSocketContext } from "../Context/SocketContext";

const MessageInput = ({ selectedUser, setMessages }) => {
  const [message, setMessage] = useState("");

  const { socket } = useSocketContext();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSend = async () => {
    if (!message.trim()) return;

    const messageData = {
      receiverId: selectedUser._id,
      message,
    };

    const res = await axios.post(
      "http://localhost:5000/api/chat/send",
      messageData,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
     setMessages((prev) => [...prev, res.data]);

    socket.emit("sendMessage", {
      ...res.data,
      receiverId: selectedUser._id,
    });

    setMessage("");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        borderTop: "1px solid #ddd",
        background: "white",
        position: "sticky",
        bottom: 0,
      }}
    >
        <input
        type="text"
        placeholder="Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: "25px",
          border: "1px solid #ccc",
          outline: "none",
          fontSize: "16px",
        }}
      />

      <button
        onClick={handleSend}
        style={{
          padding: "12px 20px",
          border: "none",
          borderRadius: "25px",
          background: "green",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
    