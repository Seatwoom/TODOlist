import React, { useState } from 'react';
import styled from 'styled-components';
import {
  faCircle,
  faCheckCircle,
  faTrash,
  faEdit,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import {
  Input,
  IconComponent,
  ActionIcon,
  CheckIcon,
} from '../../styles/styles';

const ToDoComponent = styled.li`
  &.completed {
    text-decoration: line-through;
  }
  display: flex;
  align-items: center;
  margin: 10px 0;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px;
`;

const TaskText = styled.span`
  flex-grow: 1;
  margin-left: 10px;
  cursor: ${(props) => (props.isEditing ? 'default' : 'pointer')};
  text-decoration: ${(props) => (props.status ? 'line-through' : 'none')};
  color: ${(props) => (props.status ? '#888' : '#000')};
  /* Ensure text is visible */
  display: inline-block;
  min-height: 20px;
  line-height: 20px;
`;

const EditInput = styled(Input)`
  font-size: 15px;
  margin-left: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  flex-grow: 1;
`;

function TD({ td, toggleTD, deleteTD, num, editTD, isEditing, setIsEditing }) {
  const [editText, setEditText] = useState(td.text);

  const handleEditToggle = () => {
    if (isEditing === null) {
      setIsEditing(num);
      setEditText(td.text);
    }
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSave = () => {
    if (editText.trim() === '') {
      deleteTD(num);
    } else {
      editTD(num, editText);
    }
    setIsEditing(null);
  };

  const handleToggle = () => {
    if (isEditing === null) {
      toggleTD(num);
    }
  };

  const handleDelete = () => {
    if (isEditing === null) {
      deleteTD(num);
    }
  };

  return (
    <ToDoComponent
      data-testid={`task-${num}`}
      className={td.status ? 'completed' : ''}
    >
      <IconComponent>
        <ActionIcon
          data-testid={`delete-button-${num}`}
          icon={faTrash}
          color={isEditing === null ? '#d4d4d4' : 'lightgray'}
          onClick={handleDelete}
          style={{ cursor: isEditing === null ? 'pointer' : 'not-allowed' }}
        />
        {isEditing === num ? (
          <ActionIcon
            data-testid={`save-button-${num}`}
            icon={faSave}
            color="#d4d4d4"
            onClick={handleEditSave}
          />
        ) : (
          <ActionIcon
            data-testid={`edit-button-${num}`}
            icon={faEdit}
            color={isEditing === null ? '#d4d4d4' : 'lightgray'}
            onClick={handleEditToggle}
            style={{ cursor: isEditing === null ? 'pointer' : 'not-allowed' }}
          />
        )}
      </IconComponent>
      <CheckIcon
        data-testid={`task-checkbox-${num}`}
        icon={td.status ? faCheckCircle : faCircle}
        color={td.status ? 'green' : '#d4d4d4'}
        onClick={handleToggle}
        isEditing={isEditing !== null}
      />
      {isEditing === num ? (
        <EditInput
          data-testid={`task-edit-input-${num}`}
          type="text"
          value={editText}
          onChange={handleEditChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleEditSave();
            }
          }}
          autoFocus
        />
      ) : (
        <TaskText
          data-testid={`task-text-${num}`}
          status={td.status}
          onClick={handleToggle}
          isEditing={isEditing !== null}
        >
          {td.text}
        </TaskText>
      )}
    </ToDoComponent>
  );
}

export default TD;
