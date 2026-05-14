import { useEffect, useState }
from "react";

import axios from "axios";

import styles
from "./AdminDashboard.module.css";

function AdminDashboard() {

  const [data, setData] =
    useState({});

  const [tab, setTab] =
    useState("users");

  useEffect(() => {

    const fetchData =
    async () => {

      try {

        // ✅ TOKEN

        const token =
          localStorage.getItem(
            "token"
          );

        // ✅ API CALL

        const res =
          await axios.get(

            "https://nerabybackend-6.onrender.com/api/admin/dashboard",

            {
              headers: {

                Authorization:
                `Bearer ${token}`

              }
            }

          );

        setData(res.data);

      } catch (error) {

        console.log(
          error.response?.data ||
          error.message
        );

      }

    };

    fetchData();

    const interval =
      setInterval(() => {

        fetchData();

      }, 3000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <div className={styles.page}>

      {/* TOPBAR */}

      <div className={styles.topbar}>

        <div className={styles.logo}>

          Metivo

          <span
            className={
              styles.adminBadge
            }
          >
            ADMIN
          </span>

        </div>

      </div>


      {/* STATS */}

      <div className={styles.statGrid}>

        <div className={styles.statCard}>

          <div className={styles.statIcon}>
            👥
          </div>

          <div className={styles.statValue}>
            {data.totalUsers || 0}
          </div>

          <div className={styles.statLabel}>
            Total Users
          </div>

        </div>

        <div className={styles.statCard}>

          <div className={styles.statIcon}>
            🟢
          </div>

          <div className={styles.statValue}>
            {data.activeUsers || 0}
          </div>

          <div className={styles.statLabel}>
            Active Users
          </div>

        </div>

      </div>


      {/* USER TABLE */}

      <div className={styles.userTable}>

        {data.users?.map((u) => (

          <div
            key={u._id}
            className={styles.userRow}
          >

            <div className={styles.userAv}>

              {u.name?.[0]}

            </div>

            <div className={styles.userInfo}>

              <div className={styles.userName}>
                {u.name}
              </div>

              <div className={styles.userEmail}>
                {u.email}
              </div>

              <div className={styles.userMeta}>

                {u.isOnline

                  ? "🟢 Active"

                  : "⚫ Offline"}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default AdminDashboard;