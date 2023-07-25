import React from "react";
import Styled from "./index.styles";
import { Comment } from "../../../store/reducers/commentSlice";
import CommentItem from "../CommentItem";

export interface CommentsContainerProps {
  comments: Comment[];
}

const CommentsContainer: React.FC<CommentsContainerProps> = ({ comments }) => {
  return (
    <Styled.CommentContainer>
      {comments?.map((comment) => (
        <CommentItem comment={comment} key={comment.commentId} />
      ))}
    </Styled.CommentContainer>
  );
};

export default CommentsContainer;
