import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

const AuthorContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const LinkContainer = styled(Link)`
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

const ButtonContainer = styled.div`
  position: absolute;
  right: 0;
  padding-left: 30px;
  pointer-events: all;
`;

const EditButton = styled(BsThreeDotsVertical)`
  font-size: 18px;
`;

export default {
  AuthorContainer,
  LinkContainer,
  AuthorImage,
  AuthorName,
  ButtonContainer,
  EditButton,
};
