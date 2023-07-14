import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import SignupImage from "../../Components/SignupImage";
import {
  signup,
  selectIsLoading,
  selectError,
} from "../../store/reducers/userSlice";

const Signup = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // 비밀번호 확인이 일치하지 않을 경우 에러 처리
      return;
    }

    const userData = {
      email,
      password,
      userName,
      userImage: selectedImage,
    };

    dispatch(signup(userData));
  };

  return (
    <Styled.SignupContainer>
      <Styled.InputContainer>
        <Styled.Label>Email 주소</Styled.Label>
        <Styled.Input
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </Styled.InputContainer>

      <Styled.InputContainer>
        <Styled.Label>비밀번호</Styled.Label>
        <Styled.Input
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </Styled.InputContainer>

      <Styled.InputContainer>
        <Styled.Label>비밀번호 확인</Styled.Label>
        <Styled.Input
          type="password"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />
      </Styled.InputContainer>

      <Styled.InputContainer>
        <Styled.Label>닉네임</Styled.Label>
        <Styled.Input
          type="text"
          value={userName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserName(e.target.value)
          }
        />
      </Styled.InputContainer>

      <Styled.InputContainer>
        <Styled.Label>프로필 이미지</Styled.Label>
        <SignupImage
          imageUrl={
            selectedImage ? URL.createObjectURL(selectedImage) : "./avatar.png"
          }
          onChange={handleImageChange}
        />
      </Styled.InputContainer>

      <Styled.ButtonContainer>
        <Styled.Button color="#8D7B68" onClick={handleSubmit}>
          가입하기
        </Styled.Button>
      </Styled.ButtonContainer>
    </Styled.SignupContainer>
  );
};

export default Signup;
