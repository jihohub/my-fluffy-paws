import React, { useState, useEffect } from "react";
import Styled from "./index.styles";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  fetchPostById,
  selectPostById,
  selectIsLoading,
  selectError,
  updatePost,
} from "../../store/reducers/postSlice";
import Loading from "../../Components/Loading";

const EditForm: React.FC = () => {
  const { postId } = useParams() as { postId: string };
  const navigate = useNavigate();

  const post = useSelector(selectPostById(parseInt(postId)));
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(fetchPostById(parseInt(postId)));
  }, [dispatch, postId]);

  const [text, setText] = useState<string>(post?.text || "");

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newContent = event.target.value;
    if (newContent.length <= 500) {
      setText(newContent);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);

    await dispatch(
      updatePost({
        postId: parseInt(postId),
        text: text,
      })
    );
    // Replace "YOUR_ACCESS_TOKEN" with the actual access token. You can obtain it from the state or local storage.

    navigate("/");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Styled.EditFormContainer>
      <Styled.InputContainer>
        <Styled.TextContainer>
          <Styled.Textarea
            placeholder="내용을 입력하세요... (선택사항)"
            value={text}
            onChange={handleContentChange}
            maxLength={500}
          />
          <Styled.CharCount>{text.length}/500</Styled.CharCount>
        </Styled.TextContainer>
      </Styled.InputContainer>
      <Styled.ButtonContainer>
        <Styled.Button color="#8D7B68" onClick={handleSubmit}>
          작성 완료
        </Styled.Button>
      </Styled.ButtonContainer>
    </Styled.EditFormContainer>
  );
};

export default EditForm;
