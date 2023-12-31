import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  signup,
  checkDuplicateUserName,
  userActions,
  selectIsUserNameDuplicate,
  selectUser,
  selectError,
} from "../../store/reducers/userSlice";
import Styled from "./index.styles";
import SignupImage from "../../Components/Signup/SignupImage";
import SignupComplete from "../../Components/Signup/SignupComplete";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const isUserNameDuplicate = useSelector(selectIsUserNameDuplicate);
  const user = useSelector(selectUser);
  const error = useSelector(selectError);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isSignupComplete, setSignupComplete] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUserName = e.target.value;
    setUserName(newUserName);

    // 닉네임 중복 검사 요청
    dispatch(checkDuplicateUserName(newUserName));
  };

  useEffect(() => {
    user && navigate("/");
  }, [user]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  // 컴포넌트가 마운트되었을 때 에러 메시지 초기화
  useEffect(() => {
    dispatch(userActions.clearError());
    // 언마운트될 때 clearError 실행
    return () => {
      dispatch(userActions.clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    // 아이디가 이메일 형식인지 검사 (간단한 형식 체크 예시)
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // 비밀번호가 8자리 이상인지 검사
    const isPasswordValid = password.length >= 8;

    // 비밀번호 확인이 일치하는지 검사
    const isConfirmPasswordValid = password === confirmPassword;

    // 닉네임이 빈 문자열이 아니고 영어와 숫자만 포함되는지 검사
    const isUserNameValid = /^[A-Za-z0-9]+$/.test(userName.trim());

    // 모든 조건이 만족하면 버튼 활성화
    setIsButtonDisabled(
      !(
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isUserNameValid
      )
    );
  }, [email, password, confirmPassword, userName]);

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // 비밀번호 확인이 일치하지 않을 경우 에러 처리
      return;
    }

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);
    formData.append("userName", userName);
    formData.append("userImage", selectedImage as Blob);

    const result = await dispatch(signup(formData));

    if (result.type === "user/signup/fulfilled") {
      setSignupComplete(true);
    }
  };

  return (
    <Styled.SignupContainer>
      {isSignupComplete ? (
        <SignupComplete />
      ) : (
        <>
          <Styled.InputContainer>
            <Styled.Label>Email 주소</Styled.Label>
            <Styled.Input
              type="email"
              value={email}
              placeholder="이메일 형식에 맞게 입력해주세요."
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
              placeholder="8자리 이상 입력해주세요."
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
              placeholder="동일한 비밀번호를 입력해주세요."
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
              placeholder="닉네임은 영어와 숫자만 포함해야 합니다."
              onChange={handleUserNameChange}
            />
            {isUserNameDuplicate && (
              <Styled.ErrorMessage>
                이미 존재하는 닉네임입니다.
              </Styled.ErrorMessage>
            )}
          </Styled.InputContainer>

          <Styled.InputContainer>
            <Styled.Label>프로필 이미지</Styled.Label>
            <SignupImage
              imageUrl={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : "./avatar.png"
              }
              onChange={handleImageChange}
            />
          </Styled.InputContainer>

          <Styled.ButtonContainer>
            <Styled.Button
              color="#8D7B68"
              onClick={handleSubmit}
              disabled={isButtonDisabled}
            >
              가입하기
            </Styled.Button>
          </Styled.ButtonContainer>
        </>
      )}
    </Styled.SignupContainer>
  );
};

export default Signup;
