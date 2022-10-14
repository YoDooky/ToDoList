import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../../../context";
import cl from "./MyForm.module.css";

const FormRegister = ({ showSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post("http://localhost:4444/auth/register", {
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

  return (
    <div>
      <h1>Sign Un</h1>
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
          type="text"
        />
        <button className={cl.FormButtonRegister} onClick={handleRegister}>
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default FormRegister;
