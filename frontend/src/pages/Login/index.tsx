import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import Styled from "./index.styles";
import { login } from "../../store/reducers/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 이메일과 비밀번호를 이용하여 로그인 요청을 보냄
    await dispatch(login({ email, password }));
    navigate("/");
  };

  return (
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
  );
};

export default Login;
