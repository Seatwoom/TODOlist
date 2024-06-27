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

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
      alert("Username already exists");
    } else if (username && password) {
      users[username] = { password, toDos: [] };
      localStorage.setItem("users", JSON.stringify(users));
      alert("Successful registration");
      navigate("/login");
    } else {
      alert("Invalid registration");
    }
  };

  return (
    <Container>
      <h2>Register</h2>
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
      <Button onClick={handleRegister}>Register</Button>
      <StyledLink to="/login">Login to your account</StyledLink>
    </Container>
  );
};

export default Register;
