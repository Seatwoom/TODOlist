import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const ActionIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
  cursor: ${(props) => (props.isEditing ? "not-allowed" : "pointer")};
`;

export const Button = styled.button`
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: gray;
  }
`;

export const CheckIcon = styled(FontAwesomeIcon)`
  transition: color 0.5s;
  margin-left: 5px;
  cursor: ${(props) => (props.isEditing ? "not-allowed" : "pointer")};
`;

export const IconComponent = styled.div`
  display: flex;
`;

export const Input = styled.input`
  margin: 10px;
  padding: 10px;
  width: 200px;
`;

export const LogoutButton = styled.button`
  position: absolute;
  top: 1em;
  right: 1em;
  background: none;
  color: red;
  border: none;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    top: 0.5em;
    right: 0.5em;
  }
`;

export const StyledLink = styled(Link)`
  color: blue;
  text-decoration: none;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

export const Text = styled.span`
  font-size: 15px;
  margin-left: 5px;
  flex-grow: 1;
  cursor: ${(props) => (props.isEditing ? "auto" : "pointer")};
`;
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 20px;
`;
export const NavLinks = styled.div`
  position: absolute;
  top: 3em;
  right: 1em;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  a {
    color: blue;
    text-decoration: none;
    margin-bottom: 0.5em;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 600px) {
    top: 2em;
    right: 0.5em;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  overflow: hidden;
  text-align: center;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 250px;
  @media (max-width: 600px) {
    margin-top: 3em;
  }
`;
