import React, { useEffect, useState } from "react";
import Styled from "./index.styles";

export interface PostContainerProps {
  author: {
    userId: number;
    userName: string;
    userImage: string;
  };
}

const AuthorView: React.FC<PostContainerProps> = ({ author }) => {
  return (
    <Styled.AuthorContainer to={`/user/${author.userId}`}>
      <Styled.AuthorImage src={author.userImage} alt="User Image" />
      <Styled.AuthorName>{author.userName}</Styled.AuthorName>
    </Styled.AuthorContainer>
  );
};

export default AuthorView;
