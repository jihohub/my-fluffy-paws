import styled from "styled-components";
import { Link } from "react-router-dom";

const MainContainer = styled.div`
  width: 600px;
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const ViewCommentsLink = styled.p`
  color: #8d7b68;
  font-size: 24px;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export default {
  MainContainer,
  ViewCommentsLink,
};
