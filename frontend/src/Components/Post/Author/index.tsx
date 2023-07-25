import React, { useEffect, useState, SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/reducers/userSlice";
import Styled from "./index.styles";
import Toast from "../../Toast";
export interface PostContainerProps {
  authorProps: {
    postId: number;
    author: {
      userId: number;
      userName: string;
      userImage: string;
    };
  };
}

const Author: React.FC<PostContainerProps> = ({ authorProps }) => {
  const { postId, author } = authorProps;
  const user = useSelector(selectUser);

  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  const handleMenuClick = (event: React.MouseEvent) => {
    setIsToastVisible((prevState) => !prevState);
  };

  return (
    <Styled.AuthorContainer>
      <Styled.LinkContainer to={`/user/${author.userId}`}>
        <Styled.AuthorImage src={author.userImage} alt="User Image" />
        <Styled.AuthorName>{author.userName}</Styled.AuthorName>
      </Styled.LinkContainer>
      {author.userId === user?.userId ? (
        <Styled.ButtonContainer onClick={handleMenuClick}>
          <Styled.EditButton />
        </Styled.ButtonContainer>
      ) : (
        <></>
      )}
      {isToastVisible && <Toast toastProps={{ path: "post", postId }} />}
    </Styled.AuthorContainer>
  );
};

export default Author;
