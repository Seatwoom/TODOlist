import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, StyledLink, Container } from "../../styles/styles";

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
