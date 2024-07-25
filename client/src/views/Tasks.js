import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputTD from "../components/todo/inputTD";
import ListTD from "../components/todo/listTD";
import { LogoutButton, Container, NavLinks, Header } from "../styles/styles";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Tasks = () => {
  const [toDos, setToDos] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/tasks`, {
          headers: {
            Authorization: token,
          },
        });
        const data = await response.json();
        setToDos(data);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    };

    fetchTodos();
  }, []);

  const saveTodos = async (todos) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ todos }),
      });
    } catch (error) {
      console.error("Failed to save todos", error);
    }
  };

  const addTD = (text) => {
    const newTD = { text, status: false };
    const newToDos = [...toDos, newTD];
    setToDos(newToDos);
    saveTodos(newToDos);
  };

  const toggleTD = (index) => {
    const newToDos = [...toDos];
    newToDos[index].status = !newToDos[index].status;
    newToDos.sort((a, b) => a.status - b.status);
    setToDos(newToDos);
    saveTodos(newToDos);
  };

  const deleteTD = (index) => {
    const newToDos = [...toDos];
    newToDos.splice(index, 1);
    setToDos(newToDos);
    saveTodos(newToDos);
  };

  const editTD = (index, newText) => {
    const newToDos = [...toDos];
    newToDos[index].text = newText;
    setToDos(newToDos);
    saveTodos(newToDos);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <Header>
        <NavLinks>
          <Link to="/cats">Cat Cards</Link>
        </NavLinks>
        <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
      </Header>
      <Container>
        <Title>To-Do List</Title>
        <InputTD addTD={addTD} />
        <ListTD
          toDos={toDos}
          toggleTD={toggleTD}
          deleteTD={deleteTD}
          editTD={editTD}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </Container>
    </div>
  );
};
export default Tasks;
