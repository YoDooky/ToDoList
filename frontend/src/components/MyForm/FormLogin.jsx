import axios from "axios";
import config from "../../config/default.json";
import { useState, useContext } from "react";
import { AuthContext } from "../../context";
import cl from "./MyForm.module.css";

const FormLogin = ({ showSignUp }) => {
  const { setIsAuth } = useContext(AuthContext);
  const { setToken } = useContext(AuthContext);
  const { setUserId } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post(`${config.backendUrl}/auth/login`, {
          fullName: username,
          password: password,
        })
        .then(function (res) {
          if (res.status === 200) {
            setIsAuth(true);
            localStorage.setItem("auth", "true");
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            setUserId(res.data._id);
            localStorage.setItem("userId", res.data._id);
          } else {
            res.data.forEach((resData) => alert(resData.msg));
          }
        })
        .catch((err) => {
          err.response.data.forEach((err) => alert(err.msg));
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    showSignUp(true);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form className={cl.FormAuth}>
        <label className={cl.FormLabel}>username</label>
        <input
          className={cl.FormInput}
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          type="text"
        />
        <label className={cl.FormLabel}>password</label>
        <input
          className={cl.FormInput}
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          type="password"
        />
        <button className={cl.FormButtonLogin} onClick={handleLogin}>
          LOGIN
        </button>
        <button className={cl.FormButtonRegister} onClick={handleRegister}>
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
