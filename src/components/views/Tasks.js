import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputTD from "../todo/inputTD";
import ListTD from "../todo/listTD";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import Container from "../layouts/Container";
import LogoutButton from "../common/Logout";

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Tasks = () => {
  const currentUser = getLocalStorage("currentUser");
  const [toDos, setToDos] = useState(() => {
    const users = getLocalStorage("users") || {};
    return users[currentUser]?.toDos || [];
  });

  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    const users = getLocalStorage("users") || {};
    if (users[currentUser]) {
      users[currentUser].toDos = toDos;
      setLocalStorage("users", users);
    }
  }, [toDos, currentUser]);

  const addTD = (text) => {
    const newTD = { text, status: false };
    setToDos([...toDos, newTD]);
  };

  const toggleTD = (index) => {
    const newToDos = [...toDos];
    newToDos[index].status = !newToDos[index].status;
    newToDos.sort((a, b) => a.status - b.status);
    setToDos(newToDos);
  };

  const deleteTD = (index) => {
    const newToDos = [...toDos];
    newToDos.splice(index, 1);
    setToDos(newToDos);
  };

  const editTD = (index, newText) => {
    const newToDos = [...toDos];
    newToDos[index].text = newText;
    setToDos(newToDos);
  };

  const handleLogout = () => {
    const users = getLocalStorage("users") || {};
    if (users[currentUser]) {
      users[currentUser].toDos = toDos;
      setLocalStorage("users", users);
    }
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authenticated");
    window.location.href = "/login";
  };

  return (
    <Container>
      <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
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
  );
};

export default Tasks;
