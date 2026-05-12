import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Navbar from '../../Components/Navbar/Navbar';

import api from '../../services/api';

import {
  formatDistance,
  getInterest
} from '../../utils/helper';

import styles from './Home.module.css';

export default function Home() {

  const navigate = useNavigate();

  const [nearby, setNearby] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const storedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {

    navigator.geolocation?.getCurrentPosition(

      async ({ coords }) => {

        try {

          const { data } = await api.get(

            '/users/nearby/list',

            {
              params: {
                lat: coords.latitude,
                lng: coords.longitude,
                radius: 2,
              },
            }

          );

          console.log(
            "HOME NEARBY:",
            data.users
          );

          setNearby(data.users || []);

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

  return (

    <div className={styles.page}>

      {/* HEADER */}

      <div className={styles.header}>

        <div>

          <div className={styles.logo}>
            ConnectNearby
          </div>

          <h1 className={styles.greeting}>
            Hey,
            {storedUser?.name || "User"} 👋
          </h1>

          <p className={styles.sub}>
            People nearby, right now
          </p>

        </div>

        <Link
          to="/discover"
          className={styles.mapBtn}
        >
          🧭 Map
        </Link>

      </div>

      {/* PROFILE */}

      <div
        className={styles.profileCard}

        onClick={() =>
          navigate("/profile")
        }
      >

        <div className={styles.avatar}>

          {storedUser?.name?.[0]?.toUpperCase() || "U"}

        </div>

        <div className={styles.profileInfo}>

          <h2>
            {storedUser?.name}
          </h2>

          <p>
            {storedUser?.email}
          </p>

          <p>
            {storedUser?.bio}
          </p>

          <p>
            Age:
            {storedUser?.age}
          </p>

          <div className={styles.interests}>

            {(storedUser?.interests || [])
              .map((id) => {

                const int =
                  getInterest(id);

                return (

                  <span
                    key={id}
                    className={styles.tag}
                  >
                    {int.icon}
                    {int.label}
                  </span>

                );

              })}

          </div>

        </div>

      </div>

      {/* NEARBY USERS */}

      <div className={styles.section}>

        <div className={styles.sectionHead}>

          <span className={styles.sectionTitle}>
            Nearby Users
          </span>

        </div>

        {loading ? (

          <p className={styles.hint}>
            Finding people...
          </p>

        ) : nearby.length === 0 ? (

          <p className={styles.hint}>
            No users nearby
          </p>

        ) : (

          <div className={styles.userList}>

            {nearby.map((u) => (

              <div
                key={u._id}
                className={styles.userCard}
              >

                <div className={styles.uAvatar}>
                  {u.name?.[0]?.toUpperCase()}
                </div>

                <div className={styles.uInfo}>

                  <span className={styles.uName}>
                    {u.name}
                  </span>

                  <span className={styles.uDist}>
                    {formatDistance(
                      u.distanceKm || 0
                    )}
                  </span>

                  <p>
                    {u.bio}
                  </p>

                  <p
                    style={{
                      color: u.isOnline
                        ? "#22c55e"
                        : "#999",
                      fontSize: "12px"
                    }}
                  >
                    {u.isOnline
                      ? "🟢 Active Now"
                      : "⚫ Offline"}
                  </p>

                </div>

                <div className={styles.uPills}>

                  {(u.interests || [])
                    .slice(0, 3)
                    .map((id) => {

                      const int =
                        getInterest(id);

                      return (

                        <span
                          key={id}
                          className={styles.pill}
                          style={{
                            background: int.bg,
                            color: int.color
                          }}
                        >
                          {int.icon}
                        </span>

                      );

                    })}

                </div>

                {/* CHAT BUTTON */}

                <button
  className={styles.chatBtn}
  onClick={() => {

    localStorage.setItem(
      "chatUser",
      JSON.stringify(u)
    );

    navigate(`/chat/${u._id}`);

  }}
>
  💬 Chat
</button>

              </div>

            ))}

          </div>

        )}

      </div>

      <Navbar />

    </div>

  );

}