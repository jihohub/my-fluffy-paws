import styled from "styled-components";
import { Link } from "react-router-dom";

const MainContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const NoUnderlineLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const ViewCommentsLink = styled.p`
  color: #8d7b68;
  font-size: 24px;
  &:hover {
    cursor: pointer;
  }
`;

export default {
  MainContainer,
  NoUnderlineLink,
  ViewCommentsLink,
};
