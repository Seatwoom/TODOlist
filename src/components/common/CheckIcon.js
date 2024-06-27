import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CheckIcon = styled(FontAwesomeIcon)`
  transition: color 0.5s;
  margin-left: 5px;
  cursor: ${(props) => (props.isEditing ? "not-allowed" : "pointer")};
`;

export default CheckIcon;
