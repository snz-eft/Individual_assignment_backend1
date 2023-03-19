import { Alert, Button, Container, Stack, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const onRegister = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5050/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        password: pass,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setUser("");
          setPass("");
          setErr(false);
          setSuccess(true);
          navigate("/login");
        } else if (res.status === 409) {
          setSuccess(false);
          setErr(true);
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <Container maxWidth="sm">
        <Stack spacing={2} direction="column">
          <h1>Register form</h1>
          <TextField
            required
            id="user"
            label="User"
            variant="outlined"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField
            required
            id="pass"
            label="Password"
            variant="outlined"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <Button
            variant="contained"
            color="error"
            size="large"
            disabled={!(user && pass)}
            onClick={onRegister}
          >
            Register
          </Button>

          <Link to="/login">Already a member? Login here!</Link>

          {success && (
            <Alert severity="success">
              The username has registered successfully!
            </Alert>
          )}

          {err && (
            <Alert severity="error">This username has already exist!</Alert>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default Register;
