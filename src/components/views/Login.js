import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, StyledLink, Container } from "../../styles/styles";
import { API_BASE_URL } from "../../config";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        return alert("Invalid login");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/tasks");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
      <StyledLink to="/register">Not registered yet? Do it now</StyledLink>
    </Container>
  );
};

export default Login;
