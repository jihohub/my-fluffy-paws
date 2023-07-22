import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import {
  Post as PostData,
  fetchPosts,
  selectPosts,
  selectIsLoading,
  selectError,
} from "../../store/reducers/postSlice";
import PostContainer from "../../Components/PostContainer";
import CommentsContainer from "../../Components/CommentsContainer";
import Modal from "../../Components/Modal";
import Loading from "../../Components/Loading";

const Home = () => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

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

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>게시물이 없습니다.</div>;
  }

  return (
    <Styled.MainContainer>
      {posts?.length > 0 ? (
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
      )}
      {selectedPost && (
        <Modal onClose={handleCloseModal} modalRef={modalRef}>
          <CommentsContainer comments={selectedPost.comments} />
        </Modal>
      )}
    </Styled.MainContainer>
  );
};

export default Home;
