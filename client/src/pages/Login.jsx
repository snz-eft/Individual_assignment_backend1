import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Container, Stack, TextField } from "@mui/material";
import { useAuth } from "hooks/useAuth";

const Login = () => {
  const auth = useAuth();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user()) {
      navigate("/todos");
    }
  }, []);

  const onLogin = (e) => {
    e.preventDefault();
    auth.login(
      {
        username: user,
        password: pass,
      },
      (res) => {
        if (res.ok) {
          setErr(false);
          setSuccess(true);
          navigate("/todos");
        } else {
          setErr(true);
        }
      }
    );
    // fetch("http://localhost:5050/auth/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: user,
    //     password: pass,
    //   }),
    //   credentials: "include",
    // })
    //   .then((res) => {
    //     if (res.ok) {
    //       setErr(false);
    //       setSuccess(true);
    //       navigate("/todos");
    //     } else {
    //       setErr(true);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <>
      <Container maxWidth="sm">
        <Stack spacing={2} direction="column" margin="0 0 5rem 0">
          <h1>Login form</h1>
          <TextField
            id="user"
            label="User"
            variant="outlined"
            value={user}
            disabled={success}
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField
            id="pass"
            label="Password"
            variant="outlined"
            type="password"
            value={pass}
            disabled={success}
            onChange={(e) => setPass(e.target.value)}
          />
          <Button
            disabled={!(user && pass) || success}
            variant="contained"
            size="large"
            onClick={onLogin}
          >
            Login
          </Button>
          <Link to="/register">Not a member? Register here!</Link>
          {err && <Alert severity="error">User not found!</Alert>}
          {success && <Alert severity="success">Login success!</Alert>}
        </Stack>
      </Container>
    </>
  );
};

export default Login;
