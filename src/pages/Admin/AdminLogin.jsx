import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {

  const [email, setEmail] =
  useState("");

  const [password, setPassword] =
  useState("");

  const login = async () => {

    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password
      }
    );

    if (
      res.data.user.role === "admin"
    ) {

      localStorage.setItem(
        "adminToken",
        res.data.token
      );

      window.location.href =
      "/admin";

    } else {

      alert("Not Admin");

    }

  };

  return (

    <div>

      <h1>Admin Login</h1>

      <input
        placeholder="email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={login}>
        Login
      </button>

    </div>

  );

}