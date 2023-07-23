import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 600px;
`;

const Message = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
`;

const LinkToLogin = styled(Link)`
  color: #8d7b68;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
`;

export default { Container, Message, Description, LinkToLogin };
