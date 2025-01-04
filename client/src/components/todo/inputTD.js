import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from '../../styles/styles';

const Form = styled.form`
  display: flex;
  align-items: center;
`;

function InputTD({ addTD }) {
  const [value, setValue] = useState('');

  const handleInput = (e) => {
    e.preventDefault();
    if (!value) return;
    addTD(value);
    setValue('');
  };

  return (
    <Form onSubmit={handleInput}>
      <Input
        data-testid="new-task-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add something"
      />
      <Button data-testid="add-task-button" type="submit">
        Add
      </Button>
    </Form>
  );
}

export default InputTD;
