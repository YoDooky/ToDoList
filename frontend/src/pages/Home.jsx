import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context";
import ToDo from "../components/ToDo";
import ToDoForm from "../components/ToDoForm";
import axios from "axios";
import config from "../config/default.json";
import MyModal from "../components/UI/MyModal/MyModal";
import FormLogin from "../components/MyForm/FormLogin";
import FormRegister from "../components/MyForm/FormRegister";

const Home = () => {
  const { isAuth } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const { userId } = useContext(AuthContext);
  const [tasks, setTask] = useState([]);
  const [signUp, showSignUp] = useState(false);

  const getUserTasks = async () => {
    try {
      await axios
        .get(`${config.backendUrl}/tasks/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setTask(res.data));
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
          .post(`${config.backendUrl}/tasks`, newItem, {
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
          .delete(`${config.backendUrl}/tasks/${taskId}`, {
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
    const complete = tasks.filter((task) => task._id === taskId)[0].completed; //read current task.completed state to inverse it
    const newItem = {
      completed: !complete,
    };
    if (taskId) {
      try {
        await axios
          .patch(`${config.backendUrl}/tasks/${taskId}`, newItem, {
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

  const editTask = async (taskId, userInput) => {
    const newItem = {
      text: userInput,
    };
    if (taskId) {
      try {
        await axios
          .patch(`${config.backendUrl}/tasks/${taskId}`, newItem, {
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

  useEffect(() => {
    getUserTasks();
  }, [isAuth]);

  return (
    <div className="App">
      <MyModal visible={!isAuth}>
        {!signUp ? (
          <FormLogin showSignUp={showSignUp} />
        ) : (
          <FormRegister showSignUp={showSignUp} />
        )}
      </MyModal>
      {isAuth ? (
        <div>
          <ToDoForm tasks={tasks} addTask={addTask} />
          <section className="task-list">
            {tasks.map((task) => (
              <ToDo
                key={task._id}
                task={task}
                removeTask={removeTask}
                completeTask={completeTask}
                editTask={editTask}
              />
            ))}
          </section>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
