import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "pages/TodoList";
import { Container } from "@mui/material";
import Tasks from "pages/Tasks";
import Menu from "Menu";
import Friends from "pages/Friends";
import { AuthProvider, RequireAuth } from "hooks/useAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));

const containerCSS = {
  margin: "1rem",
};
root.render(
  <AuthProvider>
    <Container style={containerCSS}>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/todos"
            element={
              <RequireAuth>
                <TodoList />
              </RequireAuth>
            }
          />
          <Route
            path="/todos/:todoId"
            element={
              <RequireAuth>
                <Tasks />
              </RequireAuth>
            }
          />
          <Route
            path="/friends"
            element={
              <RequireAuth>
                <Friends />
              </RequireAuth>
            }
          />
          <Route
            path="/friends/:friendId/todos"
            element={
              <RequireAuth>
                <TodoList />
              </RequireAuth>
            }
          />
          <Route
            path="/friends/:friendId/todos/:todoId/tasks"
            element={
              <RequireAuth>
                <Tasks />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </Container>
  </AuthProvider>
);
