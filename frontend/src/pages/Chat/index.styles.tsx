import styled from "styled-components";
import { Link } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const TextContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  background-color: #8d7b68;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);

  svg {
    font-size: 36px;
  }
`;

const Text = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

export default {
  MainContainer,
  TextContainer,
  Text,
};
