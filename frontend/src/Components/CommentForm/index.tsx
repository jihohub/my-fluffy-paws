import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchPostById } from "../../store/reducers/postSlice";
import { createComment } from "../../store/reducers/commentSlice";
import Styled from "./index.styles";

const CommentForm: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { postId } = useParams() as { postId: string };
  const [content, setContent] = useState("");

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 유효성 검사
    if (content.trim() === "") {
      return; // 댓글 내용이 비어있으면 전송하지 않음
    }

    // 댓글 생성 액션 디스패치
    await dispatch(createComment({ postId: parseInt(postId), content }));
    await dispatch(fetchPostById(parseInt(postId)));

    // 댓글 내용 초기화
    setContent("");
  };

  return (
    <Styled.CommentFormContainer onSubmit={handleSubmit}>
      <Styled.Textarea
        placeholder="댓글을 입력하세요..."
        value={content}
        onChange={handleContentChange}
      />
      <Styled.SubmitButton type="submit">댓글 작성</Styled.SubmitButton>
    </Styled.CommentFormContainer>
  );
};

export default CommentForm;
