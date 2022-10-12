import { Paper, FormControlLabel, Button, Checkbox, Grid } from "@mui/material";
import { Delete } from "@mui/icons-material";

function ToDo({ task, removeTask, completeTask }) {
  const deleteItem = () => {
    removeTask(task._id);
  };

  const completeItem = () => {
    completeTask(task._id);
  };

  return (
    <Paper
      elevation={3}
      style={{
        margin: 8,
      }}
    >
      <Grid container>
        <Grid item lg={6} md={6} sm={6} xs={6} pl={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={task.completed ? true : false}
                onClick={completeItem}
              />
            }
            label={task.text}
            style={{
              display: "flex",
              textDecoration: task.completed ? "line-through" : "",
            }}
          />
        </Grid>
        {/* <Grid item lg={6} md={6} sm={6} xs={6} alignContent={"flex-end"}> */}
        <Button onClick={deleteItem}>
          <Delete />
        </Button>
        {/* </Grid> */}
      </Grid>
    </Paper>
  );
}

export default ToDo;
