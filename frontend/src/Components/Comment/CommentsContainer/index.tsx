import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
  comments: Comment[];
}

const CommentsContainer: React.FC<CommentsContainerProps> = ({ comments }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const location = useLocation();
  const isPostRoute = location.pathname.startsWith("/post/");

  const user = useSelector(selectUser);
  const token = useSelector(selectAccessToken);

  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<number>(0);

  const handleMenuClick = () => {
    setIsToastVisible((prevState) => !prevState);
  };

  const handleLikeComment = async () => {
    await dispatch(likeComment({ commentId, token }));
    await dispatch(fetchComments(commentId));
    // setIsLiked(true);
  };

  const handleUnlikeComment = async () => {
    await dispatch(unlikeComment({ commentId, token }));
    await dispatch(fetchComments(commentId));
    // setIsLiked(false);
  };

  const handleIconClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    handleMenuClick();
    id && setCommentId(id);
  };

  return (
    <Styled.CommentContainer>
      {/* {posts?.length > 0 ? (
        posts?.map((post) => {
          const commentLinkText =
            post?.comments?.length > 3
              ? `댓글 ${post?.comments?.length}개 모두 보기`
              : `댓글 ${post?.comments?.length}개 보기`;

          return (
            <>
              <PostContainer post={post} key={post.postId} />
              {post?.comments?.length > 0 && (
                <>
                  <Styled.ViewCommentsLink
                    onClick={() => handleOpenModal(post)}
                  >
                    {commentLinkText}
                  </Styled.ViewCommentsLink>
                  <CommentsContainer comments={post.comments.slice(0, 3)} />
                </>
              )}
            </>
          );
        })
      ) : (
        <p>게시물이 없습니다.</p>
      )} */}
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
          <Styled.LikesContainer>
            <Styled.LikesCount>{comment?.likedUser?.userId}</Styled.LikesCount>
            <Styled.HeartConatainer>
              {comment?.likedUser?.userId === user?.userId ? (
                <BsHeartFill onClick={handleUnlikeComment} />
              ) : (
                <BsHeart onClick={handleLikeComment} />
              )}
            </Styled.HeartConatainer>
          </Styled.LikesContainer>
          {isPostRoute && user?.userId === comment.userId && (
            <Styled.IconContainer>
              <BsThreeDotsVertical
                onClick={(e) => handleIconClick(e, comment.commentId)}
              />
            </Styled.IconContainer>
          )}
        </Styled.CommentItem>
      ))}
      {isToastVisible && <Toast path="comment" commentId={commentId} />}
      {/* {selectedPost && (
        <Modal onClose={handleCloseModal} modalRef={modalRef}>
          <CommentsContainer comments={selectedPost.comments} />
        </Modal>
      )} */}
    </Styled.CommentContainer>
  );
};

export default CommentsContainer;
