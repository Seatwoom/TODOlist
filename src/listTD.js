import React, { useState } from "react";
import TD from "./TD";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;
function ListTD({ toDos, toggleTD, deleteTD, editTD }) {
  return (
    <List>
      {toDos.map((td, num) => (
        <TD
          key={num}
          num={num}
          td={td}
          toggleTD={toggleTD}
          deleteTD={deleteTD}
          editTD={editTD}
        />
      ))}
    </List>
  );
}
export default ListTD;
