import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ChatBox from "../../Components/ChatBox/ChatBox";
import Navbar from "../../Components/Navbar/Navbar";

import styles from "./Chat.module.css";

export default function Chat() {

  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [peer, setPeer] = useState(null);

  useEffect(() => {

    const currentUser = JSON.parse(localStorage.getItem("user"));
    const chatUser = JSON.parse(localStorage.getItem("chatUser"));

    setUser(currentUser);
    setPeer(chatUser);

  }, [id]);

  if (!user || !peer) {
    return <div style={{ color: "#fff" }}>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <ChatBox user={user} peer={peer} />
      <Navbar />
    </div>
  );
}