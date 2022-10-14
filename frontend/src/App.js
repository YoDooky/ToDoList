import { useState } from "react";
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/index.js";

function App() {
  const [isAuth, setIsAuth] = useState(false || localStorage.getItem("auth"));
  const [token, setToken] = useState("" || localStorage.getItem("token"));
  const [userId, setUserId] = useState("" || localStorage.getItem("userId"));

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, token, setToken, userId, setUserId }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
