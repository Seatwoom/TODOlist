import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, StyledLink, Container } from "../styles/styles";
import { API_BASE_URL } from "../config";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Successful registration");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      setError("Registration failed");
    }
  };

  return (
    <Container>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
