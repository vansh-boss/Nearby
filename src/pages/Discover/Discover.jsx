import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";

import Map from "../../Components/Map/Map";

import {
  formatDistance,
  getInterest,
  initials,
  avatarColor
} from "../../utils/helper";

import { INTERESTS } from "../../utils/constants";

import api from "../../services/api";

import styles from "./Discover.module.css";

export default function Discover() {

  const navigate = useNavigate();

  const [users, setUsers] =
    useState([]);

  const [center, setCenter] =
    useState([
      28.6139,
      77.2090
    ]);

  const [filter, setFilter] =
    useState("all");

  const [loading, setLoading] =
    useState(true);

  const [selectedUser, setSelectedUser] =
    useState(null);

  useEffect(() => {

    navigator.geolocation?.getCurrentPosition(

      async ({ coords }) => {

        const c = [
          coords.latitude,
          coords.longitude
        ];

        setCenter(c);

        try {

          const { data } =
            await api.get(
              "/users/nearby/list",
              {
                params: {
                  lat: c[0],
                  lng: c[1],
                  radius: 5
                }
              }
            );

          setUsers(data.users || []);

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);

        }

      },

      () => {

        setLoading(false);

      }

    );

  }, []);

  const filtered =
    filter === "all"
      ? users
      : users.filter((u) =>
          (u.interests || [])
            .includes(filter)
        );

  const openChat = (user) => {

    localStorage.setItem(
      "chatUser",
      JSON.stringify(user)
    );

    navigate(`/chat/${user._id}`);

  };

  return (

    <div className={styles.page}>

      {/* HEADER */}

      <div className={styles.header}>

        <h1 className={styles.title}>
          Discover
        </h1>

        <p className={styles.sub}>
          Find nearby people
        </p>

      </div>

      {/* MAP */}

      <div className={styles.mapWrap}>

        <Map
          users={filtered}
          center={center}
          radius={5}
        />

        <div className={styles.mapOverlay} />

        <div className={styles.mapBadge}>

          <span className={styles.dot} />

          {filtered.length} Nearby

        </div>

        {/* LIVE USERS */}

        <div className={styles.liveUsers}>

          {filtered
            .slice(0, 6)
            .map((u, i) => {

              const av =
                avatarColor(
                  u.name || ""
                );

              return (

                <div
                  key={u._id}

                  className={styles.livePin}

                  style={{
                    top: `${15 + i * 12}%`,
                    left: `${12 + i * 13}%`
                  }}

                  onClick={() =>
                    setSelectedUser(u)
                  }
                >

                  <div
                    className={styles.pinAvatar}

                    style={{
                      background: av.bg,
                      color: av.color
                    }}
                  >
                    {initials(u.name)}
                  </div>

                  <div className={styles.pinName}>
                    📍 {u.name}
                  </div>

                </div>

              );

            })}

        </div>

      </div>

      {/* PREVIEW */}

      {selectedUser && (

        <div className={styles.previewCard}>

          <div className={styles.previewTop}>

            <div className={styles.previewAvatar}>
              {initials(selectedUser.name)}
            </div>

            <div>

              <h3 className={styles.previewName}>
                {selectedUser.name}
              </h3>

              <p className={styles.previewDist}>
                📍 {
                  formatDistance(
                    selectedUser.distanceKm || 0
                  )
                }
              </p>

            </div>

          </div>

          <div className={styles.previewPills}>

            {(selectedUser.interests || [])
              .slice(0, 3)
              .map((id) => {

                const int =
                  getInterest(id);

                return (

                  <span
                    key={id}

                    className={styles.previewPill}

                    style={{
                      background: int.bg,
                      color: int.color
                    }}
                  >
                    {int.icon} {int.label}
                  </span>

                );

              })}

          </div>

          <div className={styles.previewActions}>

            <button
              className={styles.chatBtn}

              onClick={() =>
                openChat(selectedUser)
              }
            >
              💬 Chat
            </button>

          </div>

        </div>

      )}

      {/* FILTER */}

      <div className={styles.filterRow}>

        <button
          className={`${styles.chip}
          ${
            filter === "all"
              ? styles.chipActive
              : ""
          }`}

          onClick={() =>
            setFilter("all")
          }
        >
          All
        </button>

        {INTERESTS.map(
          ({ id, label, icon }) => (

          <button
            key={id}

            className={`${styles.chip}
            ${
              filter === id
                ? styles.chipActive
                : ""
            }`}

            onClick={() =>
              setFilter(id)
            }
          >
            {icon} {label}
          </button>

        ))}

      </div>

      {/* USER LIST */}

      <div className={styles.list}>

        {loading && (
          <p className={styles.hint}>
            Finding nearby users...
          </p>
        )}

        {!loading &&
          filtered.length === 0 && (
            <p className={styles.hint}>
              No users nearby.
            </p>
          )}

        {filtered.map((u) => {

          const av =
            avatarColor(u.name || "");

          return (

            <div
              key={u._id}
              className={styles.userCard}
            >

              <div
                className={styles.avatar}

                style={{
                  background: av.bg,
                  color: av.color
                }}
              >
                {initials(u.name)}
              </div>

              <div className={styles.info}>

                <div className={styles.name}>
                  {u.name}
                </div>

                <div className={styles.dist}>
                  📍 {
                    formatDistance(
                      u.distanceKm || 0
                    )
                  }
                </div>

              </div>

              <div className={styles.actions}>

                <button
                  className={styles.chatBtn}
                  

                  onClick={() =>
                    
                    openChat(u)
                  }
                >
                  💬
                </button>

              </div>

            </div>

          );

        })}

      </div>

      <Navbar />

    </div>

  );

}