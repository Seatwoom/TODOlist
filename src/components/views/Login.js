import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "../common/Input";
import Button from "../common/Button";
import StyledLink from "../common/StyledLink";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 20px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || {};
    const user = storedUsers[username];

    if (user && user.password === password) {
      localStorage.setItem("currentUser", username);
      localStorage.setItem("authenticated", "true");
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
