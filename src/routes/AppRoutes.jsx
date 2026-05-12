import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import Home from "../pages/Home/Home";
import Discover from "../pages/Discover/Discover";
import Chat from "../pages/Chat/Chat";
import About from "../pages/About/About";
import Shoutouts from "../pages/Shoutouts/Shoutouts";
import Profile from "../pages/Profile/Profile";

import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";

function PrivateRoute({ children }) {

  const token =
    localStorage.getItem("token");

  return token
    ? children
    : <Navigate to="/login" />;

}

export default function AppRoutes() {

  return (

    <Routes>

      {/* PUBLIC */}

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* PRIVATE */}

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/discover"
        element={
          <PrivateRoute>
            <Discover />
          </PrivateRoute>
        }
      />

      {/* IMPORTANT */}

      <Route
        path="/chat/:id"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />

      <Route
        path="/shoutouts"
        element={
          <PrivateRoute>
            <Shoutouts />
          </PrivateRoute>
        }
      />

      <Route
        path="/about"
        element={
          <PrivateRoute>
            <About />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      {/* ADMIN */}

      <Route
        path="/admin-login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin"
        element={<AdminDashboard />}
      />

      {/* FALLBACK */}

      <Route
        path="*"
        element={<Navigate to="/home" />}
      />

    </Routes>

  );

}