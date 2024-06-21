import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCheckCircle,
  faTrash,
  faEdit,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

const ToDoComponent = styled.li`
  display: flex;
  align-items: center;
  margin: 10px 0;
  background-color: #ffffff;
  border-radius: 5px;
  text-decoration: ${(props) => (props.status ? "line-through" : "none")};
`;

const Text = styled.span`
  font-size: 15px;
  margin-left: 5px;
  flex-grow: 1;
  cursor: ${(props) => (props.isEditing ? "auto" : "pointer")};
`;

const IconComponent = styled.div`
  display: flex;
`;

const CheckIcon = styled(FontAwesomeIcon)`
  transition: color 0.5s;
  margin-left: 5px;
  cursor: ${(props) => (props.isEditing ? "not-allowed" : "pointer")};
`;

const ActionIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
  cursor: ${(props) => (props.isEditing ? "not-allowed" : "pointer")};
`;

const EditInput = styled.input`
  font-size: 15px;
  margin-left: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

function TD({ td, toggleTD, deleteTD, num, editTD, isEditing, setIsEditing }) {
  const [editText, setEditText] = useState(td.text);

  const handleEditToggle = () => {
    if (isEditing === null) {
      setIsEditing(num);
    }
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSave = () => {
    editTD(num, editText);
    setIsEditing(null);
  };

  const handleToggle = () => {
    if (!isEditing) {
      toggleTD(num);
    }
  };

  const handleDelete = () => {
    if (!isEditing) {
      deleteTD(num);
    }
  };

  return (
    <ToDoComponent status={td.status}>
      <IconComponent>
        <ActionIcon icon={faTrash} color="#d4d4d4" onClick={handleDelete} />
        {isEditing === num ? (
          <ActionIcon icon={faSave} color="#d4d4d4" onClick={handleEditSave} />
        ) : (
          <ActionIcon
            icon={faEdit}
            color="#d4d4d4"
            onClick={handleEditToggle}
            style={{ cursor: isEditing !== null ? "not-allowed" : "pointer" }}
          />
        )}
      </IconComponent>
      <CheckIcon
        icon={td.status ? faCheckCircle : faCircle}
        color={td.status ? "green" : "#d4d4d4"}
        onClick={handleToggle}
        isEditing={isEditing !== null}
      />
      {isEditing === num ? (
        <EditInput
          type="text"
          value={editText}
          onChange={handleEditChange}
          autoFocus
        />
      ) : (
        <Text
          status={td.status}
          onClick={handleToggle}
          isEditing={isEditing !== null}
        >
          {td.text}
        </Text>
      )}
    </ToDoComponent>
  );
}

export default TD;
