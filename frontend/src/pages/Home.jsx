import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import { AuthContext } from "../context";
import ToDo from "../components/ToDo";
import ToDoForm from "../components/ToDoForm";
import axios from "axios";

const Home = () => {
  const { isAuth } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const { userId } = useContext(AuthContext);
  const [tasks, setTask] = useState([]);

  const getUserTasks = async () => {
    try {
      await axios
        .get(`http://localhost:4444/tasks/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setTask(res.data));
      // .then((res) => {
      //   res.data.forEach((element) => {
      //     const lastItem = {
      //       id: element._id,
      //       text: element.text,
      //       completed: element.completed,
      //     };
      //     setTask((tasks) => [...tasks, lastItem]);
      //   });
      // });
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = async (userInput) => {
    if (userInput) {
      const newItem = {
        text: userInput,
      };
      try {
        await axios
          .post("http://localhost:4444/tasks", newItem, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            getUserTasks();
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const removeTask = async (taskId) => {
    if (taskId) {
      try {
        await axios
          .delete(`http://localhost:4444/tasks/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            setTask(tasks.filter((task) => task._id !== taskId));
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const completeTask = async (taskId) => {
    const complete = tasks.filter((task) => task._id === taskId)[0].completed;
    const newItem = {
      completed: !complete,
    };
    if (taskId) {
      try {
        await axios
          .patch(`http://localhost:4444/tasks/${taskId}`, newItem, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            getUserTasks();
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  const editTask = async () => {};

  useEffect(() => {
    getUserTasks();
  }, []);

  return (
    <div className="App">
      {!isAuth ? (
        <Navigate to="/login" />
      ) : (
        <Container maxWidth="sm">
          <ToDoForm tasks={tasks} addTask={addTask} />
          {tasks.map((task) => (
            <ToDo
              key={task._id}
              task={task}
              removeTask={removeTask}
              completeTask={completeTask}
            />
          ))}
        </Container>
      )}
    </div>
  );
};

export default Home;
