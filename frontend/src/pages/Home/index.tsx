import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import {
  Post as PostData,
  fetchPosts,
  selectPosts,
} from "../../store/reducers/postSlice";
import PostContainer from "../../Components/PostContainer";
import CommentsContainer from "../../Components/CommentsContainer";
import Modal from "../../Components/Modal";

const Home = () => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(fetchPosts());
    console.log(posts);
  }, []);

  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = (post: PostData) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleCloseModal();
    }
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Styled.MainContainer>
      {posts?.map((post) => {
        const commentLinkText =
          post.commentCount > 3
            ? `댓글 ${post.commentCount}개 모두 보기`
            : `댓글 ${post.commentCount}개 보기`;

        return (
          <>
            <Link to={`/post/${post.postId}`} key={post.postId}>
              <PostContainer post={post} />
            </Link>
            {post.commentCount > 0 && (
              <Styled.ViewCommentsLink onClick={() => handleOpenModal(post)}>
                {commentLinkText}
              </Styled.ViewCommentsLink>
            )}
            <CommentsContainer comments={post.Comments.slice(0, 3)} />
          </>
        );
      })}
      {selectedPost && (
        <Modal onClose={handleCloseModal} modalRef={modalRef}>
          <CommentsContainer comments={selectedPost.Comments} />
        </Modal>
      )}
    </Styled.MainContainer>
  );
};

export default Home;
