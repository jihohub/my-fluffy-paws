import styled from "styled-components";

const MainContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 80px;
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
