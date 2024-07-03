import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, StyledLink, Container } from "../../styles/styles";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || {};
    const user = storedUsers[username];

    if (user && user.password === password) {
      localStorage.setItem("currentUser", JSON.stringify(username));
      localStorage.setItem("authenticated", JSON.stringify(true));
      navigate("/tasks");
    } else {
      alert("Invalid login");
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
