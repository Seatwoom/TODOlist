import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export const ActionIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
  cursor: ${(props) => (props.isEditing ? 'not-allowed' : 'pointer')};
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
  cursor: ${(props) => (props.isEditing ? 'not-allowed' : 'pointer')};
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
  background: none;
  color: red;
  border: none;
  cursor: pointer;
  font-size: 1em;
  padding: 0;
  margin: 0;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    margin-top: 1em;
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
  cursor: ${(props) => (props.isEditing ? 'auto' : 'pointer')};
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
  display: flex;
  gap: 1em;

  a {
    color: blue;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 600px) {
    margin-top: 1em;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 600px) {
    gap: 10px;
    grid-template-columns: repeat(2, 1fr);
  }
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
    margin-top: 3 px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;
export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow-y: auto;
  position: relative;

  button {
    position: absolute;
    bottom: 10px;
  }

  @media (max-width: 600px) {
    button {
      position: static;
      margin-bottom: 15px;
    }
  }
`;
