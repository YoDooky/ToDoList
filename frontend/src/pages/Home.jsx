import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Container, Button } from "@mui/material";
import { AuthContext } from "../context";
import ToDo from "../components/ToDo";
import ToDoForm from "../components/ToDoForm";
import axios from "axios";

const Home = () => {
  const { isAuth } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const { userId } = useContext(AuthContext);
  const [tasks, setTask] = useState([]);
  const [isCompleted, setIsCompleted] = useState();

  // const getTask = async (taskId) => {
  //   if (taskId) {
  //     try {
  //       const res = await axios
  //         .get(`http://localhost:4444/tasks/${taskId}`)
  //         .then((res) => {
  //           setTask((tasks)=>[...tasks, tasks.filter(task=>task.id==taskId)[0]]);
  //         });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  const getUserTasks = async () => {
    try {
      const res = await axios
        .get(`http://localhost:4444/tasks/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          res.data.map((element) => {
            const lastItem = {
              id: element._id,
              text: element.text,
              completed: element.completed,
            };
            setTask((tasks) => [...tasks, lastItem]);
            console.log("added to SetTask");
          });
        });
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
        const res = await axios
          .post("http://localhost:4444/tasks", newItem, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            setTask((tasks) => [...tasks, newItem]);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const removeTask = async (taskId) => {
    if (taskId) {
      try {
        const res = await axios
          .delete(`http://localhost:4444/tasks/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            setTask(tasks.filter((task) => task.id !== taskId));
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const completeTask = async (taskId) => {
    const complete = tasks.filter((task) => task.id == taskId)[0].completed;
    const newData = {
      completed: !complete,
    };
    if (taskId) {
      try {
        const res = await axios.patch(
          `http://localhost:4444/tasks/${taskId}`,
          newData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // .then(
        //   setTask((tasks) => {
        //     tasks.filter((task) => task.id !== taskId);
        //   })
        // );
      } catch (err) {
        console.log(err);
      }
    }
  };

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
              key={task.id}
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
