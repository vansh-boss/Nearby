import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {

  const navigate = useNavigate();
  const [role, setRole] = useState("user");

  // USER
  const [name, setName] = useState("");   // 👈 NEW
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ADMIN
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // USER LOGIN
  const handleUserLogin = async () => {

    try {

      const res = await axios.post(
        "https://nerabybackend-6.onrender.com/api/auth/login",
        {
          name,        // 👈 send username also
          email,
          password,
          role: "user"
        }
      );

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/home");

    } catch (error) {
      console.log(error.response);
      alert(error.response?.data?.message);
    }

  };

  // ADMIN LOGIN
const handleAdminLogin = async () => {

  try {

    const res = await axios.post(

      "https://nerabybackend-6.onrender.com/api/admin/login",

      {
        email: adminEmail,
        password: adminPassword
      }

    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(

      "admin",

      JSON.stringify(
        res.data.admin
      )

    );

    navigate("/admin");

  } catch (error) {

    console.log(error);

    alert(

      error.response?.data?.message ||

      "Admin Login Failed"

    );

  }

};
  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <h1 className={styles.logo}>ConnectNearby</h1>

        <h2 className={styles.heading}>Welcome Back</h2>
        <p className={styles.sub}>Login to your account</p>

        <div className={styles.roleRow}>

          <button
            className={role === "user" ? styles.active : ""}
            onClick={() => setRole("user")}
          >
            User
          </button>

          <button
            className={role === "admin" ? styles.active : ""}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>

        </div>

        {/* USER LOGIN */}
        {role === "user" && (
          <div className={styles.form}>

            {/* 👇 NEW USERNAME FIELD */}
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleUserLogin}>
              User Login
            </button>

            <p className={styles.footer}>
              No account?
              <span
                className={styles.footerLink}
                onClick={() => navigate("/register")}
              >
                Register here
              </span>
            </p>

          </div>
        )}

        {/* ADMIN LOGIN */}
        {role === "admin" && (
          <div className={styles.form}>

            <input
              type="email"
              placeholder="Admin Email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />

            <button onClick={handleAdminLogin}>
              Admin Login
            </button>

          </div>
        )}

      </div>
    </div>
  );
}