import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputTD from '../components/todo/inputTD';
import ListTD from '../components/todo/listTD';
import { fetchTasks, saveTasks } from '../api/tasksAPI';
import { LogoutButton, Container, NavLinks, Header } from '../styles/styles';
import { Link } from 'react-router-dom';

const Title = styled.h2`
  margin-bottom: 20px;
`;

const LoadingText = styled.p`
  text-align: center;
  color: #666;
`;

const Tasks = () => {
  const [toDos, setToDos] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        const data = await fetchTasks(token);
        if (mounted) {
          setToDos(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Failed to fetch todos', error);
        if (mounted) {
          setError('Failed to load tasks');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTodos();

    return () => {
      mounted = false;
    };
  }, []);

  const saveTodosWithRetry = async (newTodos) => {
    let attempts = 3;
    while (attempts > 0) {
      try {
        const token = localStorage.getItem('token');
        await saveTasks(newTodos, token);
        return true;
      } catch (error) {
        attempts--;
        if (attempts === 0) {
          console.error('Failed to save tasks after retries:', error);
          return false;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    return false;
  };

  const addTD = async (text) => {
    try {
      const newTD = { text, status: false };
      const newToDos = [...toDos, newTD];
      setToDos(newToDos);
      await saveTodosWithRetry(newToDos);
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Failed to add task');
    }
  };

  const toggleTD = async (index) => {
    try {
      const newToDos = [...toDos];
      newToDos[index] = {
        ...newToDos[index],
        status: !newToDos[index].status,
      };
      setToDos(newToDos);
      await saveTodosWithRetry(newToDos);
    } catch (error) {
      console.error('Error toggling task:', error);
      setError('Failed to update task');
    }
  };

  const deleteTD = async (index) => {
    try {
      const newToDos = toDos.filter((_, i) => i !== index);
      setToDos(newToDos);
      await saveTodosWithRetry(newToDos);
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task');
    }
  };

  const editTD = async (index, newText) => {
    try {
      const newToDos = [...toDos];
      newToDos[index] = {
        ...newToDos[index],
        text: newText,
      };
      setToDos(newToDos);
      await saveTodosWithRetry(newToDos);
    } catch (error) {
      console.error('Error editing task:', error);
      setError('Failed to edit task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingText>Loading tasks...</LoadingText>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <div>
      <Header>
        <NavLinks>
          <Link to="/cats" data-testid="cats-link">
            Cat Cards
          </Link>
        </NavLinks>
        <LogoutButton data-testid="logout-button" onClick={handleLogout}>
          Log out
        </LogoutButton>
      </Header>
      <Container>
        <Title>To-Do List</Title>
        <InputTD addTD={addTD} data-testid="new-task-input" />
        <div data-testid="task-list">
          <ListTD
            toDos={toDos}
            toggleTD={toggleTD}
            deleteTD={deleteTD}
            editTD={editTD}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
      </Container>
    </div>
  );
};

export default Tasks;
