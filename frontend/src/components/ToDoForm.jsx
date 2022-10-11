import { useState } from "react";
import { Input, Button, FormControl } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context";

function ToDoForm({ tasks, addTask }) {
  const [userInput, setUserInput] = useState("");
  const { isAuth, setIsAuth } = useContext(AuthContext);

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
    <div>
      <header>
        <Button onClick={logout} variant="contained">
          Logout
        </Button>
        <h1>Today tasks: {tasks.length}</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth={true}>
          <Input
            style={{
              margin: 8,
              color: "rgb(199, 219, 219)",
            }}
            value={userInput}
            type="text"
            onChange={handleChange}
            placeholder="new task..."
          />
          <Button color="primary" type="submit" variant="contained">
            add
          </Button>
        </FormControl>
      </form>
    </div>
  );
}

export default ToDoForm;
