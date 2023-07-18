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
  const [ text, setText] = useState("");

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newContent = event.target.value;
    if (newContent.length <= 100) {
      setText(newContent);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 유효성 검사
    if (text.trim() === "") {
      return; // 댓글 내용이 비어있으면 전송하지 않음
    }

    // 댓글 생성 액션 디스패치
    await dispatch(createComment({ postId: parseInt(postId), text }));
    await dispatch(fetchPostById(parseInt(postId)));

    // 댓글 내용 초기화
    setText("");
  };

  return (
    <>
      <Styled.CommentFormContainer onSubmit={handleSubmit}>
        <Styled.Textarea
          placeholder="댓글을 입력하세요..."
          value={text}
          onChange={handleContentChange}
          maxLength={100}
        />
        <Styled.CharCount>{text.length}/100</Styled.CharCount>
      </Styled.CommentFormContainer>
      <Styled.ButtonContainer>
        <Styled.Button color="#8D7B68" onClick={handleSubmit}>
          작성 완료
        </Styled.Button>
      </Styled.ButtonContainer>
    </>
  );
};

export default CommentForm;
