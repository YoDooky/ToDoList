import axios from "axios";
import config from "../../config/default.json";
import { useState } from "react";
import cl from "./MyForm.module.css";

const FormRegister = ({ showSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post(`${config.backendUrl}/auth/register`, {
          fullName: username,
          password: password,
        })
        .then(function (res) {
          if (res.status === 200) {
            showSignUp(false);
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

  const handleBack = (event) => {
    event.preventDefault();
    showSignUp(false);
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
        <button className={cl.FormButtonRegister} onClick={handleRegister}>
          REGISTER
        </button>
        <button className={cl.FormButtonLogin} onClick={handleBack}>
          BACK
        </button>
      </form>
    </div>
  );
};

export default FormRegister;
