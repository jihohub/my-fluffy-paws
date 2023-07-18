import React from "react";
import Styled from "./index.styles";
import moment from "moment";
import "moment/locale/ko";

interface CommentsContainerProps {
  comments: {
    commentId: number;
    User: {
      userName: string;
      userImage: string;
    };
    text: string;
    createdAt: Date;
  }[];
}

const CommentsContainer: React.FC<CommentsContainerProps> = ({ comments }) => {
  return (
    <Styled.CommentContainer>
      {comments.map((comment) => (
        <Styled.CommentItem key={comment.commentId}>
          <Styled.CommentUserImage
            src={comment.User.userImage}
            alt="User Image"
          />
          <Styled.TextContainer>
            <Styled.UpperContainer>
              <Styled.CommentUserName>
                {comment.User.userName}
              </Styled.CommentUserName>
              <Styled.CommentDate>
                {moment(comment.createdAt).fromNow()}
              </Styled.CommentDate>
            </Styled.UpperContainer>
            <Styled.LowerContainer>
              <Styled.CommentText>{comment.text}</Styled.CommentText>
            </Styled.LowerContainer>
          </Styled.TextContainer>
        </Styled.CommentItem>
      ))}
    </Styled.CommentContainer>
  );
};

export default CommentsContainer;
