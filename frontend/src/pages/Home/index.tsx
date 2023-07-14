import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import {
  Post as PostData, fetchPosts,
  selectPosts,
} from "../../store/reducers/postSlice";
import { RootState } from "../../store/store";
import PostContainer from "../../Components/PostContainer";
import CommentsContainer from "../../Components/CommentsContainer";
import Modal from "../../Components/Modal";

const Home = () => {
  const posts = useSelector(selectPosts);
  // const posts = useSelector((state: RootState) => state.post.posts);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(fetchPosts()); // 액션 객체를 디스패치합니다..
    console.log(posts);
  }, []);

  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);

  const handleOpenModal = (post: PostData) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <Styled.MainContainer>
      {posts?.map((post) => (
        <>
          <Link to={`/post/${post.postId}`} key={post.postId}>
            <PostContainer post={post} />
          </Link>
          {post.commentCount > 0 && (
            <Styled.ViewCommentsLink onClick={() => handleOpenModal(post)}>
              {`댓글 ${post.commentCount}개 보기`}
            </Styled.ViewCommentsLink>
          )}
          <CommentsContainer comments={post.Comments.slice(0, 3)} />
        </>
      ))}
      {selectedPost && (
        <Modal onClose={handleCloseModal}>
          <CommentsContainer comments={selectedPost.Comments} />
        </Modal>
      )}
    </Styled.MainContainer>
  );
};

export default Home;
