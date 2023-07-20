import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Styled from "./index.styles";
import { selectUser } from "../../store/reducers/userSlice";
import moment from "moment";
import "moment/locale/ko";
import { BsThreeDotsVertical } from "react-icons/bs";
import Toast from "../../Components/Toast";

interface CommentsContainerProps {
  comments: {
    commentId: number;
    userId: number;
    User: {
      userName: string;
      userImage: string;
    };
    text: string;
    createdAt: Date;
  }[];
}

const CommentsContainer: React.FC<CommentsContainerProps> = ({ comments }) => {
  const location = useLocation();
  const isPostRoute = location.pathname.startsWith("/post/");
  console.log(comments)

  const user = useSelector(selectUser);

  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<number>(0);

  const handleMenuClick = () => {
    setIsToastVisible((prevState) => !prevState);
  };

  const handleIconClick = (event: React.MouseEvent<SVGElement, MouseEvent>, id: number) => {
    event.preventDefault();
    event.stopPropagation();
    handleMenuClick();
    id && setCommentId(id);
  };

  return (
    <Styled.CommentContainer>
      {comments?.map((comment) => (
        <Styled.CommentItem key={comment.commentId}>
          <Styled.LinkContainer to={`/user/${comment.userId}`}>
            <Styled.CommentUserImage
              src={comment.User.userImage}
              alt="User Image"
            />
          </Styled.LinkContainer>
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
          {isPostRoute && user?.userId === comment.userId && (
            <Styled.IconConatainer>
              <BsThreeDotsVertical
                onClick={(e) => handleIconClick(e, comment.commentId)}
              />
            </Styled.IconConatainer>
          )}
        </Styled.CommentItem>
      ))}
      {isToastVisible && <Toast path="comment" commentId={commentId} />}
    </Styled.CommentContainer>
  );
};

export default CommentsContainer;
