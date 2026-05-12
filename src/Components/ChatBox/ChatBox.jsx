import { useEffect, useRef, useState } from "react";
import styles from "./ChatBox.module.css";
import { useSocket } from "../../Context/SocketContext";

export default function ChatBox({ peer, user }) {

  const { socket } = useSocket();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  const chatId = [user._id, peer._id].sort().join("_");

  // LOAD OLD MESSAGES
  useEffect(() => {
    const old = JSON.parse(localStorage.getItem(chatId)) || [];
    setMessages(old);
  }, [chatId]);

  // JOIN CHAT ROOM
  useEffect(() => {
    if (!socket) return;
    socket.emit("join_chat", chatId);
  }, [chatId, socket]);

  // RECEIVE MESSAGE (🔥 FIX DUPLICATE HERE)
  useEffect(() => {
    if (!socket) return;

    const handler = (msg) => {

      // avoid duplicate append
      setMessages((prev) => {

        const exists = prev.some(
          (m) =>
            m.text === msg.text &&
            m.senderId === msg.senderId &&
            m.time === msg.time
        );

        if (exists) return prev;

        const updated = [...prev, msg];
        localStorage.setItem(chatId, JSON.stringify(updated));
        return updated;
      });

    };

    socket.on("receive_message", handler);

    return () => socket.off("receive_message", handler);

  }, [socket, chatId]);

  // AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // SEND MESSAGE
  const sendMessage = () => {

    if (!text.trim()) return;

    const msg = {
      chatId,
      senderId: user._id,
      receiverId: peer._id,
      senderName: user.name,
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    socket.emit("send_message", msg);

    const updated = [...messages, msg];
    setMessages(updated);
    localStorage.setItem(chatId, JSON.stringify(updated));

    setText("");
  };

  return (
    <div className={styles.chatBox}>

      {/* HEADER */}
      <div className={styles.chatHeader}>
        <div className={styles.chatAvatar}>
          {peer.name?.[0]}
        </div>

        <div>
          <div className={styles.chatName}>
            {peer.name}
          </div>

          <div className={styles.chatStatus}>
            🟢 Online
          </div>
        </div>
      </div>

      {/* MESSAGES */}
      <div className={styles.chatMessages}>

        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.senderId === user._id
                ? styles.myRow
                : styles.otherRow
            }
          >
            <div
              className={
                m.senderId === user._id
                  ? styles.myMsg
                  : styles.otherMsg
              }
            >
              <div className={styles.msgText}>
                {m.text}
              </div>

              <span className={styles.msgTime}>
                {m.time}
              </span>
            </div>
          </div>
        ))}

        <div ref={bottomRef} />

      </div>

      {/* INPUT */}
      <div className={styles.chatInputRow}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && sendMessage()
          }
          placeholder="Message..."
        />

        <button onClick={sendMessage}>
          ➤
        </button>
      </div>

    </div>
  );
}