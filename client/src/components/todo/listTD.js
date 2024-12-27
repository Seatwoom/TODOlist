import React from "react";
import styled from "styled-components";
import TD from "./TD";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

function ListTD({
  toDos,
  toggleTD,
  deleteTD,
  editTD,
  isEditing,
  setIsEditing,
}) {
  return (
    <List data-testid="task-list">
      {toDos.map((td, index) => (
        <TD
          key={index}
          num={index}
          td={td}
          toggleTD={toggleTD}
          deleteTD={deleteTD}
          editTD={editTD}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ))}
    </List>
  );
}

export default ListTD;
