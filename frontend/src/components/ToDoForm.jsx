import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context";

function ToDoForm({ tasks, addTask }) {
  const [userInput, setUserInput] = useState("");
  const { setIsAuth } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(userInput);
    setUserInput("");
  };

  const handleChange = (event) => {
    setUserInput(event.currentTarget.value);
  };

  const logout = (event) => {
    event.preventDefault();
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  return (
    <header>
      <div className="navigation">
        <button className="logout-button" onClick={logout} variant="contained">
          Logout
        </button>
      </div>
      <h1>Today tasks: {tasks.length}</h1>
      <form id="new-task-form" onSubmit={handleSubmit}>
        <input
          value={userInput}
          onChange={handleChange}
          type="text"
          className="new-task-input"
          placeholder="whats your plan"
        />
        <button type="submit" id="new-task-submit">
          ADD
        </button>
      </form>
    </header>
  );
}

export default ToDoForm;
