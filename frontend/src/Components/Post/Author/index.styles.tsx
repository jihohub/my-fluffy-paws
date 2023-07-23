import styled from "styled-components";
import { Link } from "react-router-dom";

const AuthorContainer = styled(Link)`
  position: relative;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const AuthorImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const AuthorName = styled.p`
  font-weight: bold;
  margin-right: 5px;
  text-decoration: none;
  color: #000;
`;

export default {
  AuthorContainer,
  AuthorImage,
  AuthorName,
};
