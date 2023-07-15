import React, { useState } from "react";
import Styled from "./index.styles";
import PostImage from "../../Components/PostImage";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { createNewPost } from "../../store/reducers/postSlice";
import { selectUser } from "../../store/reducers/userSlice";

const PostForm: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const userInfo = useSelector(selectUser);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [isUploadImage, setIsUploadImage] = useState<boolean>(false);
  const [isActiveContent, setIsActiveContent] = useState<boolean>(false);

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
    setIsUploadImage(true);
  };

  const handleClickNext = (event: React.FormEvent) => {
    event.preventDefault();
    setIsActiveContent(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    const userId = userInfo?.userId;
    formData.append("userId", String(userId));
    formData.append("image", selectedImage as Blob);
    formData.append("content", content);

    dispatch(createNewPost(formData));
  };

  return (
    <Styled.PostFormContainer>
      {!isActiveContent ? (
        <Styled.InputContainer>
          <PostImage
            imageUrl={
              selectedImage ? URL.createObjectURL(selectedImage) : "empty"
            }
            onChange={handleImageChange}
          />
        </Styled.InputContainer>
      ) : (
        <Styled.InputContainer>
          <Styled.Label>문구 추가 (선택 사항)</Styled.Label>
          <Styled.Input />
        </Styled.InputContainer>
      )}
      {!isActiveContent ? (
        <Styled.ButtonContainer>
          <Styled.Button
            color="#8D7B68"
            onClick={handleClickNext}
            disabled={!isUploadImage}
          >
            다음
          </Styled.Button>
        </Styled.ButtonContainer>
      ) : (
        <Styled.ButtonContainer>
          <Styled.Button color="#8D7B68" onClick={handleSubmit}>
            작성 완료
          </Styled.Button>
        </Styled.ButtonContainer>
      )}
    </Styled.PostFormContainer>
  );
};

export default PostForm;
