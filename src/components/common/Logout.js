import styled from "styled-components";

const LogoutButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  color: red;
  border: none;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

export default LogoutButton;
