import React, { useEffect, useState } from "react";
import Styled from "./index.styles";

export interface PostContainerProps {
  author: {
    userId: number;
    userName: string;
    userImage: string;
  };
}

const Author: React.FC<PostContainerProps> = ({ author }) => {
  const { userId, userName, userImage } = author;
  console.log("author", author);
  console.log("author", author);
  return (
    <Styled.AuthorContainer to={`/user/${userId}`}>
      <Styled.AuthorImage src={userImage} alt="User Image" />
      <Styled.AuthorName>{userName}</Styled.AuthorName>
    </Styled.AuthorContainer>
  );
};

export default Author;
