import React from "react";
import Styled from "./index.styles";

const SignupComplete = () => {
  return (
    <Styled.Container>
      <Styled.Message>회원가입이 성공적으로 완료되었습니다!</Styled.Message>
      <Styled.Description>이제 로그인하여 서비스를 이용해보세요.</Styled.Description>
      <Styled.LinkToLogin to="/login">로그인 하기</Styled.LinkToLogin>
    </Styled.Container>
  );
};

export default SignupComplete;
