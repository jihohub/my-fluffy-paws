import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import { selectUser } from "../../../store/reducers/userSlice";
import { fetchPostById } from "../../../store/reducers/postSlice";
import { fetchComments } from "../../../store/reducers/commentSlice";
import { selectAccessToken } from "../../../store/reducers/tokenSlice";
import { likeComment, unlikeComment } from "../../../store/reducers/likeSlice";
import moment from "moment";
import "moment/locale/ko";
import { BsThreeDotsVertical, BsHeart, BsHeartFill } from "react-icons/bs";
import Toast from "../../Toast";
import { Comment } from "../../../store/reducers/commentSlice";

export interface CommentsContainerProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentsContainerProps> = ({ comment }) => {
  console.log(comment)
  const {
    User,
    commentId,
    createdAt,
    likeCount,
    likedUser,
    postId,
    text,
    userId,
  } = comment;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const user = useSelector(selectUser);
  const token = useSelector(selectAccessToken);

  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  const handleMenuClick = () => {
    setIsToastVisible((prevState) => !prevState);
  };

  const handleLikeComment = async () => {
    await dispatch(likeComment({ commentId, token }));
    await dispatch(fetchPostById(postId));
  };

  const handleUnlikeComment = async () => {
    await dispatch(unlikeComment({ commentId, token }));
    await dispatch(fetchPostById(postId));
  };

  return (
    <>
      <Styled.CommentItem key={commentId}>
        <Styled.LinkContainer to={`/user/${userId}`}>
          <Styled.CommentUserImage
            src={User.userImage}
            alt="User Image"
          />
        </Styled.LinkContainer>
        <Styled.TextContainer>
          <Styled.UpperContainer>
            <Styled.CommentUserName>
              {User.userName}
            </Styled.CommentUserName>
            <Styled.CommentDate>
              {moment(createdAt).fromNow()}
            </Styled.CommentDate>
          </Styled.UpperContainer>
          <Styled.LowerContainer>
            <Styled.CommentText>{text}</Styled.CommentText>
          </Styled.LowerContainer>
        </Styled.TextContainer>

        {user?.userId === userId && (
          <Styled.IconContainer>
            <Styled.DotIcon onClick={handleMenuClick} />
          </Styled.IconContainer>
        )}
        <Styled.LikeConatainer>
          <Styled.HeartConatainer>
            {likedUser?.some(
              (eachUser) => eachUser.userId === user?.userId
            ) ? (
              <Styled.HeartFillIcon onClick={handleUnlikeComment} />
            ) : (
              <Styled.HeartIcon onClick={handleLikeComment} />
            )}
          </Styled.HeartConatainer>
          <Styled.LikeCount>{likedUser?.length}</Styled.LikeCount>
        </Styled.LikeConatainer>
      </Styled.CommentItem>
      {isToastVisible && (
        <Toast toastProps={{ path: "comment", postId, commentId }} />
      )}
      {/* {selectedPost && (
        <Modal onClose={handleCloseModal} modalRef={modalRef}>
          <CommentsContainer comments={selectedPost.comments} />
        </Modal>
      )} */}
    </>
  );
};

export default CommentItem;
