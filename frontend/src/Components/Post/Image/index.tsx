import React from "react";
import Styled from "./index.styles";

export interface PostContainerProps {
  image: string;
}

const Image: React.FC<PostContainerProps> = ({ image }) => {
  return (
    <Styled.ContentContainer>
      <Styled.PostImage src={image} alt="Post" />
    </Styled.ContentContainer>
  );
};

export default Image;
