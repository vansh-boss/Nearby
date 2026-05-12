import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./Context/AuthContext";

import { SocketProvider } from "./Context/SocketContext";

import AppRoutes from "./routes/AppRoutes";

export default function App() {
  

  return (
  
    

    <BrowserRouter>
    

      <AuthProvider>

        <SocketProvider>

          <AppRoutes />
          

          <Toaster position="top-center" />
          

        </SocketProvider>

      </AuthProvider>

    </BrowserRouter>

  );

}