import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ActionIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
  cursor: ${(props) => (props.isEditing ? "not-allowed" : "pointer")};
`;

export default ActionIcon;
