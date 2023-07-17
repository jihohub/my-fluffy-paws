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
  // const showTimeDiff: string = (createdAt: Date) => {
  //   Const now = Moment();
  //   return ""
  // }


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
          <Styled.CommentDate>
            {moment(comment.createdAt).fromNow()}
          </Styled.CommentDate>
        </Styled.CommentItem>
      ))}
    </Styled.CommentList>
  );
};

export default CommentsContainer;
