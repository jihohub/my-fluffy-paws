import React from "react";
import Styled from "./index.styles";
import { IoMdHammer } from "react-icons/io";

const Search: React.FC = () => {
  return (
    <Styled.MainContainer>
      <Styled.TextContainer to="/">
        <IoMdHammer />
        <Styled.Text>미구현 페이지입니다.</Styled.Text>
        <Styled.Text>열심히 구현중입니다.</Styled.Text>
      </Styled.TextContainer>
    </Styled.MainContainer>
  );
};

export default Search;
