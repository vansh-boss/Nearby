import { useState, useEffect }
from "react";

import { useNavigate }
from "react-router-dom";

import Navbar
from "../../Components/Navbar/Navbar";

import Map
from "../../Components/Map/Map";

import {

  formatDistance,

  getInterest,

  initials,

  avatarColor

} from "../../utils/helper";

import { INTERESTS }
from "../../utils/constants";

import api
from "../../services/api";

import styles
from "./Discover.module.css";

export default function Discover() {

  const navigate =
    useNavigate();

  const [users, setUsers] =
    useState([]);

  const [center, setCenter] =
    useState([
      28.6139,
      77.2090
    ]);

  const [filter, setFilter] =
    useState("all");

  const [radius, setRadius] =
    useState(5);

  const [loading, setLoading] =
    useState(true);

  const [selectedUser, setSelectedUser] =
    useState(null);

  useEffect(() => {

    navigator.geolocation
    ?.getCurrentPosition(

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

                  radius

                }
              }

            );

          setUsers(
            data.users || []
          );

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

  }, [radius]);

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

    navigate(
      `/chat/${user._id}`
    );

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

      {/* RANGE */}

      <div className={styles.filterRow}>

        <button
          className={
            radius === 2
              ? styles.chipActive
              : styles.chip
          }

          onClick={() =>
            setRadius(2)
          }
        >
          2 KM
        </button>

        <button
          className={
            radius === 5
              ? styles.chipActive
              : styles.chip
          }

          onClick={() =>
            setRadius(5)
          }
        >
          5 KM
        </button>

        <button
          className={
            radius === 10
              ? styles.chipActive
              : styles.chip
          }

          onClick={() =>
            setRadius(10)
          }
        >
          10 KM
        </button>

      </div>

      {/* MAP */}

      <div className={styles.mapWrap}>

        <Map
          users={filtered}
          center={center}
          radius={radius}
        />

        <div className={styles.mapOverlay} />

        <div className={styles.mapBadge}>

          <span className={styles.dot} />

          {filtered.length} Nearby

        </div>

      </div>

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

      {/* USERS */}

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
            avatarColor(
              u.name || ""
            );

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