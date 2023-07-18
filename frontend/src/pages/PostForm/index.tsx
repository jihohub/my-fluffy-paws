import React, { useState, useEffect } from "react";
import Styled from "./index.styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { createNewPost } from "../../store/reducers/postSlice";
import { selectAccessToken } from "../../store/reducers/tokenSlice";
import PostImage from "../../Components/PostImage";
import CropImage from "../../Components/CropImage";
import base64ToFile from "../../utils/base64ToFile";

const PostForm: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const token = useSelector(selectAccessToken);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [isUploadImage, setIsUploadImage] = useState<boolean>(false);
  const [isCroppedImage, setisCroppedImage] = useState<boolean>(false);
  const [isActiveContent, setIsActiveContent] = useState<boolean>(false);

  const handleImageUrlChange = (newImageUrl: string) => {
    setCroppedImage(newImageUrl);
  };

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
    setIsUploadImage(true);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(event.target.value);
  };

  const handleToCrop = () => {
    setisCroppedImage(true);
  };

  const handleToSubmit = () => {
    setIsActiveContent(true);
  };

  useEffect(() => {
    console.log(croppedImage);
  }, [croppedImage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    const imageFile = base64ToFile(croppedImage, selectedImage);
    formData.append("image", imageFile as Blob);
    formData.append("text", text);

    await dispatch(createNewPost({ formData, token }));
    navigate("/");
  };

  return (
    <Styled.PostFormContainer>
      {!isActiveContent && !isCroppedImage && (
        <>
          <Styled.InputContainer>
            <PostImage
              imageUrl={
                selectedImage ? URL.createObjectURL(selectedImage) : "empty"
              }
              onChange={handleImageChange}
            />
          </Styled.InputContainer>
          <Styled.ButtonContainer>
            <Styled.Button
              color="#8D7B68"
              onClick={handleToCrop}
              disabled={!isUploadImage}
            >
              다음
            </Styled.Button>
          </Styled.ButtonContainer>
        </>
      )}

      {!isActiveContent && isCroppedImage && (
        <>
          <Styled.InputContainer>
            <CropImage
              image={selectedImage}
              croppedImage={croppedImage}
              onChangeImageUrl={handleImageUrlChange}
            ></CropImage>
          </Styled.InputContainer>
          <Styled.ButtonContainer>
            <Styled.Button color="#8D7B68" onClick={handleToSubmit}>
              다음
            </Styled.Button>
          </Styled.ButtonContainer>
        </>
      )}

      {isActiveContent && isCroppedImage && (
        <>
          <Styled.InputContainer>
            <Styled.TextContainer>
              <Styled.Textarea
                placeholder="내용을 입력하세요... (선택사항)"
                value={text}
                onChange={handleContentChange}
              />
            </Styled.TextContainer>
          </Styled.InputContainer>
          <Styled.ButtonContainer>
            <Styled.Button color="#8D7B68" onClick={handleSubmit}>
              작성 완료
            </Styled.Button>
          </Styled.ButtonContainer>
        </>
      )}
    </Styled.PostFormContainer>
  );
};

export default PostForm;
