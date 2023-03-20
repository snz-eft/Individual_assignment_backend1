// @ts-nocheck
import { DeleteTwoTone } from "@mui/icons-material";
import { useAuth } from "hooks/useAuth";
import { Link, useParams } from "react-router-dom";

const {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Container,
  Typography,
  Button,
  IconButton,
  Grid,
  TextField,
  Alert,
} = require("@mui/material");
const { default: React, useEffect, useState } = require("react");

const TodoList = (props) => {
  const auth = useAuth();
  const { friendId } = useParams();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        let todoRequest;
        if (friendId) {
          todoRequest = await fetch(
            `http://localhost:5050/friends/${friendId}/todos`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
        } else {
          todoRequest = await fetch("http://localhost:5050/todos", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
        }

        const todoResult = await todoRequest.json();
        setTodos(todoResult);
      } catch (e) {
        auth.logout();
      }
    };
    fetchTodos();
  }, [refresh, auth, friendId]);

  const handleAddTodo = async () => {
    try {
      const response = await fetch(`http://localhost:5050/todos/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name: newTodo }),
      });
      if (response.ok) {
        setErr(null);
      } else if (response.status !== 201) {
        const text = await response.text();
        setErr({ message: text, code: response.status });
        setTimeout(() => {
          setErr(null);
        }, 3000);
      }
      setNewTodo("");
      setRefresh(!refresh);
    } catch (e) {
      auth.logout();
    }
  };

  const handleRemoveTodo = async (todoId) => {
    try {
      await fetch(`http://localhost:5050/todos/${todoId}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setRefresh(!refresh);
    } catch (e) {
      auth.logout();
    }
  };

  return (
    <Container>
      {err && <Alert severity="error">{err.message}</Alert>}

      <Typography variant="h3" gutterBottom>
        Todo List
      </Typography>
      {!friendId && (
        <Grid container spacing={2}>
          <Grid item sm={8}>
            <TextField
              id="standard-basic"
              label="Add Todo"
              variant="standard"
              placeholder="Add a new task"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </Grid>
          <Grid item sm={4}>
            <Button onClick={() => handleAddTodo()}>Add Todo</Button>
          </Grid>
        </Grid>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.todo_name}>
                <TableCell component="th" scope="row">
                  <Link
                    to={
                      friendId
                        ? `/friends/${friendId}/todos/${todo.todo_id}/tasks`
                        : `/todos/${todo.todo_id}`
                    }
                  >
                    {todo.todo_name}
                  </Link>
                </TableCell>
                <TableCell component="th" scope="row">
                  {!friendId && (
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleRemoveTodo(todo.todo_id)}
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

export default TodoList;
