import styled from "styled-components";

const Text = styled.span`
  font-size: 15px;
  margin-left: 5px;
  flex-grow: 1;
  cursor: ${(props) => (props.isEditing ? "auto" : "pointer")};
`;

export default Text;
