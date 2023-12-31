import styled from "styled-components";
import { Link } from "react-router-dom";

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  max-width: 500px;
  display: flex;
  background-color: #ffffff;
  justify-content: space-around;
  padding: 12px 0;
  z-index: 2;

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #8d7b68;
  font-size: 14px;

  svg {
    font-size: 40px;
    margin-bottom: 4px;
    color: #8d7b68;
  }
`;

const UserImageContainer = styled.div`

`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;

export default { NavContainer, NavItem, UserImageContainer, UserImage };
