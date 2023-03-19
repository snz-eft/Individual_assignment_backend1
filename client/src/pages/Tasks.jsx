// @ts-nocheck
import { DeleteTwoTone } from "@mui/icons-material";
import { useAuth } from "hooks/useAuth";
import { useParams } from "react-router-dom";

const {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Container,
  Typography,
  TextField,
  Checkbox,
  IconButton,
  Button,
  Grid,
} = require("@mui/material");
const { default: React, useEffect, useState } = require("react");

const doneCSS = {
  textDecoration: "line-through",
};

const Tasks = (props) => {
  const auth = useAuth();
  let { friendId, todoId } = useParams();
  const [newTaskName, setNewTaskName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        let tasksRequest;
        if (friendId) {
          tasksRequest = await fetch(
            `http://localhost:5050/friends/${friendId}/todos/${todoId}/tasks`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
        } else {
          tasksRequest = await fetch(
            `http://localhost:5050/todos/${todoId}/tasks`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
        }

        const taskResult = await tasksRequest.json();
        setTasks(taskResult);
      } catch (e) {
        auth.logout();
      }
    };
    fetchTodos();
  }, [refresh, todoId]);

  const handleDone = async (taskStatus) => {
    try {
      await fetch(
        `http://localhost:5050/todos/${todoId}/tasks/${taskStatus.id}/edit`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ done: taskStatus.done }),
        }
      );
      setRefresh(!refresh);
    } catch (e) {
      auth.logout();
    }
  };

  const handleRemoveTask = async (taskId) => {
    try {
      await fetch(
        `http://localhost:5050/todos/${todoId}/tasks/${taskId}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      setRefresh(!refresh);
    } catch (e) {
      auth.logout();
    }
  };

  const handleAddTask = async () => {
    try {
      await fetch(`http://localhost:5050/todos/${todoId}/tasks/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name: newTaskName }),
      });

      setNewTaskName("");
      setRefresh(!refresh);
    } catch (e) {
      auth.logout();
    }
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Tasks
      </Typography>

      {!friendId && (
        <Grid container spacing={2}>
          <Grid item sm={8}>
            <TextField
              id="standard-basic"
              label="Add task"
              variant="standard"
              placeholder="Add a new task"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
          </Grid>
          <Grid item sm={4}>
            <Button onClick={(e) => handleAddTask()}>Add Task</Button>
          </Grid>
        </Grid>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={task.task_id}>
                <TableCell>
                  <Checkbox
                    checked={!!task.done}
                    disabled={!!friendId}
                    onClick={(e) =>
                      handleDone({
                        id: task.task_id,
                        done: e.target.checked,
                        index,
                      })
                    }
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="body1" style={task.done ? doneCSS : {}}>
                    {task.task_name}
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  {!friendId && (
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleRemoveTask(task.task_id)}
                    >
                      <DeleteTwoTone />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Tasks;
