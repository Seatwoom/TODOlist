import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: blue;
  text-decoration: none;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

export default StyledLink;
