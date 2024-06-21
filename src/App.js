import ListTD from "./listTD";
import InputTD from "./inputTD";
import "./App.css";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 20px;
`;

function App() {
  const [toDos, setToDos] = useState(() => {
    const storedToDos = localStorage.getItem("toDos");
    return storedToDos ? JSON.parse(storedToDos) : [];
  });

  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  const addTD = (td) => setToDos([...toDos, { text: td, status: false }]);

  const toggleTD = (num) => {
    const newTD = [...toDos];
    newTD[num].status = !newTD[num].status;
    setToDos(newTD);
    newTD.sort((a, b) => {
      if (a.status && !b.status) return 1;
      if (!a.status && b.status) return -1;
      return 0;
    });
  };

  const deleteTD = (num) => {
    const newTD = [...toDos];
    newTD.splice(num, 1);
    setToDos(newTD);
  };

  const editTD = (num, newText) => {
    const newToDos = [...toDos];
    newToDos[num].text = newText;
    setToDos(newToDos);
  };

  return (
    <Container>
      <h1>To Do List</h1>
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
}

export default App;
