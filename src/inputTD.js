import React, { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  font-size: 13 px;
  padding: 10px;
  width: 300 px;
  margin-right: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
`;
const Button = styled.button`
  font-size: 15 px;
  padding: 10px 10px;
  border: none;
  background-color: #2962ff;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #004aff;
  }
`;

function InputTD({ addTD }) {
  const [value, setValue] = useState("");
  const handleInput = (e) => {
    e.preventDefault();
    if (!value) return;
    addTD(value);
    setValue("");
  };
  return (
    <form onSubmit={handleInput}>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add something"
      />
      <Button type="submit"> Add </Button>
    </form>
  );
}
export default InputTD;
