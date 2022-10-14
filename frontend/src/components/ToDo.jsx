import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { useState, useRef, useEffect } from "react";

function ToDo({ task, removeTask, completeTask, editTask }) {
  const taskInput = useRef(null);
  const [inputShow, setInputShow] = useState(true);
  const [userInput, setUserInput] = useState(task.text);

  const handleBlur = () => {
    setInputShow(true);
  };

  const handleChange = (event) => {
    setUserInput(event.currentTarget.value);
  };

  const deleteItem = (event) => {
    event.preventDefault();
    removeTask(task._id);
  };

  const checkItem = (event) => {
    event.preventDefault();
    completeTask(task._id);
  };

  const editItem = (event) => {
    event.preventDefault();
    setInputShow(!inputShow);
  };

  const confirmEdit = (event) => {
    event.preventDefault();
    editTask(task._id, userInput);
    setInputShow(true);
  };

  useEffect(() => {
    inputShow || taskInput.current.focus();
  }, [inputShow]);

  return (
    <section className="task-list">
      <div id="tasks">
        <div className="task">
          <div className="task-check">
            {task.completed ? (
              <TaskAltOutlinedIcon onClick={checkItem} fontSize="large" />
            ) : (
              <RadioButtonUncheckedOutlinedIcon
                onClick={checkItem}
                fontSize="large"
              />
            )}
          </div>
          <div className="content">
            {inputShow ? (
              <p
                className="text"
                style={{
                  textDecoration: !task.completed || "line-through",
                }}
              >
                {task.text}
              </p>
            ) : (
              <div className="edit-task-container">
                <input
                  className="edit-task-input"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={userInput}
                  type="text"
                  ref={taskInput}
                />
                <button className="edit-task-button" onMouseDown={confirmEdit}>
                  OK
                </button>
              </div>
            )}
          </div>
          <div className="actions">
            <button className="edit" onClick={editItem}>
              edit
            </button>
            <button className="delete" onClick={deleteItem}>
              delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToDo;
