import React, { useState, useEffect } from "react";
import Styled from "./index.styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { createNewPost } from "../../store/reducers/postSlice";
import PostImage from "../../Components/PostImage";
import { RootState } from "../../store/store";

const PostForm: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.user.token);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedImage as Blob);
    formData.append("text", text);

    await dispatch(createNewPost({ formData, token }));
    navigate("/");
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
          <Styled.Input
            type="text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
          />
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