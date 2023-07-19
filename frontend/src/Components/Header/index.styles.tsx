import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
`;

const LogoImage = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

export default {
  HeaderContainer,
  LogoImage,
  ButtonContainer,
};
