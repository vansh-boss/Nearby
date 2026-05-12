import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

import { getUnread } from "../../utils/chatStore";

export default function Navbar() {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const unreadCount = getUnread(user?._id);

  const TABS = [
    {
      to: "/discover",
      label: "Discover",
      icon: "🧭",
    },
    {
      to: "/shoutouts",
      label: "Shoutouts",
      icon: "📣",
    },
    {
      to: "/chat",
      label: "Message",
      icon: "💬",
    },
    {
      to: "/profile",
      label: "Profile",
      icon: "👤",
    },
    {
      to: "/about",
      label: "About",
      icon: "ℹ️",
    },
  ];

  return (
    <nav className={styles.nav}>

      {TABS.map(({ to, label, icon }) => (

        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.active : ""}`
          }
        >

          <span className={styles.tabIcon}>
            {icon}

            {/* 🔥 ONLY CHAT BADGE */}
            {to === "/chat" && unreadCount > 0 && (
              <span className={styles.badge}>
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}

          </span>

          <span className={styles.tabLabel}>
            {label}
          </span>

        </NavLink>

      ))}

    </nav>
  );
}