import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, StyledLink, Container } from '../styles/styles';
import { loginUser } from '../api/authAPI';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const data = await loginUser(username, password);
      localStorage.setItem('token', data.token);
      navigate('/tasks');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      {errorMessage && (
        <p data-testid="error-message" style={{ color: 'red' }}>
          {errorMessage}
        </p>
      )}
      <Input
        data-testid="username-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <Input
        data-testid="password-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button data-testid="login-button" onClick={handleLogin}>
        Login
      </Button>
      <StyledLink to="/register">Not registered yet? Do it now</StyledLink>
    </Container>
  );
};

export default Login;
