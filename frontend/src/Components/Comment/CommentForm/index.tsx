import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { createComment, fetchCommentsByPostId } from "../../../store/reducers/commentSlice";
import { selectAccessToken } from "../../../store/reducers/tokenSlice";
import Styled from "./index.styles";
import { BsSendFill } from "react-icons/bs";

export interface CommentFormProps {
  postId: number;
}


const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const token = useSelector(selectAccessToken);
  const [text, setText] = useState("");

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newContent = event.target.value;
    if (newContent.length <= 300) {
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
    await dispatch(createComment({ postId, text, token }));
    await dispatch(fetchCommentsByPostId(postId));

    // 댓글 내용 초기화
    setText("");
  };

  return (
    <>
      <Styled.CommentFormContainer onSubmit={handleSubmit}>
        <Styled.CommentContainer>
          <Styled.Textarea
            placeholder="댓글을 입력하세요..."
            value={text}
            onChange={handleContentChange}
            maxLength={300}
          />
          <Styled.CharCount>{text.length}/300</Styled.CharCount>
        </Styled.CommentContainer>
        <Styled.ButtonContainer>
          <Styled.Button color="#8D7B68" onClick={handleSubmit}>
            <BsSendFill />
          </Styled.Button>
        </Styled.ButtonContainer>
      </Styled.CommentFormContainer>
    </>
  );
};

export default CommentForm;
