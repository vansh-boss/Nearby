import Navbar from "../../components/Navbar/Navbar";
import { getInterest } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

export default function Profile() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("chatUser");

    navigate("/login");
  };

  return (

    <div className={styles.page}>

      <div className={styles.card}>

        {/* TOP */}

        <div className={styles.top}>

          <div className={styles.avatar}>
            {user?.name?.[0]?.toUpperCase()}
          </div>

          <div>

            <h2 className={styles.name}>
              {user?.name}
            </h2>

            <p className={styles.email}>
              {user?.email}
            </p>

          </div>

        </div>

        {/* INFO */}

        <div className={styles.infoGrid}>

          <div className={styles.infoBox}>
            <span>Age</span>
            <b>{user?.age || "N/A"}</b>
          </div>

          <div className={styles.infoBox}>
            <span>Phone</span>
            <b>{user?.phone || "N/A"}</b>
          </div>

        </div>

        {/* BIO */}

        <div className={styles.bioBox}>

          <h3>Bio</h3>

          <p>
            {user?.bio ||
              "No bio added"}
          </p>

        </div>

        {/* INTERESTS */}

        <div className={styles.interestWrap}>

          <h3>Interests</h3>

          <div className={styles.interests}>

            {(user?.interests || [])
              .map((id) => {

                const int =
                  getInterest(id);

                return (

                  <span
                    key={id}
                    className={styles.tag}
                  >
                    {int.icon} {int.label}
                  </span>

                );

              })}

          </div>

        </div>

        {/* LOGOUT BUTTON */}

        <button
          className={styles.logoutBtn}
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      <Navbar />

    </div>

  );
}