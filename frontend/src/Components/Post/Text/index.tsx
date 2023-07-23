import React, { useEffect, useState } from "react";
import Styled from "./index.styles";

export interface PostContainerProps {
  text: string;
}

const Text: React.FC<PostContainerProps> = ({ text }) => {
  return (
    <Styled.ContentContainer>
      <Styled.PostText>{text}</Styled.PostText>
    </Styled.ContentContainer>
  );
};

export default Text;
