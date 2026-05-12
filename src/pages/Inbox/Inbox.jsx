import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

export default function Inbox() {

  const navigate =
    useNavigate();

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    const chats =
      JSON.parse(
        localStorage.getItem(
          "recentChats"
        )
      ) || [];

    setUsers(chats);

  }, []);

  const openChat = (u) => {

    localStorage.setItem(
      "chatUser",
      JSON.stringify(u)
    );

    navigate(`/chat/${u._id}`);

  };

  return (

    <div
      style={{
        padding: 20,
        color: "#fff"
      }}
    >

      <h2>
        Messages 💬
      </h2>

      {users.length === 0 && (
        <p>
          No conversations yet
        </p>
      )}

      {users.map((u) => (

        <div
          key={u._id}

          onClick={() =>
            openChat(u)
          }

          style={{
            padding: 14,
            borderBottom:
              "1px solid #222",
            cursor: "pointer"
          }}
        >

          👤 {u.name}

        </div>

      ))}

    </div>

  );

}