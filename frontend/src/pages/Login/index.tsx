import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import { login, userActions, selectUser, selectIsLoading, selectError } from "../../store/reducers/userSlice";
import { issueAccessToken } from "../../store/reducers/tokenSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(selectUser);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    user && navigate("/");
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 이메일과 비밀번호를 이용하여 로그인 요청을 보냄
    await dispatch(login({ email, password }));
    await dispatch(issueAccessToken({ email, password }));
  };

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

  return (
    <>
      <Styled.LoginContainer>
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

        <Styled.ButtonContainer>
          <Styled.Button color="#8D7B68" onClick={handleSubmit}>
            로그인
          </Styled.Button>
        </Styled.ButtonContainer>
      </Styled.LoginContainer>
      <Styled.SignupButtonContainer>
        <Styled.SignupLink to="/signup">
          회원이 아니신가요? 회원가입 하기
        </Styled.SignupLink>
      </Styled.SignupButtonContainer>
    </>
  );
};

export default Login;
