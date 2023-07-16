import React from "react";
import Styled from "./index.styles";

interface CommentsContainerProps {
  comments: {
    commentId: number;
    User: {
      userName: string;
      userImage: string;
    };
    text: string;
  }[];
}

const CommentsContainer: React.FC<CommentsContainerProps> = ({ comments }) => {
  return (
    <Styled.CommentList>
      {comments.map((comment) => (
        <Styled.CommentItem key={comment.commentId}>
          <Styled.CommentUserImage
            src={comment.User.userImage}
            alt="User Image"
          />
          <Styled.CommentUserName>
            {comment.User.userName}
          </Styled.CommentUserName>
          <Styled.CommentContent>{comment.text}</Styled.CommentContent>
        </Styled.CommentItem>
      ))}
    </Styled.CommentList>
  );
};

export default CommentsContainer;
