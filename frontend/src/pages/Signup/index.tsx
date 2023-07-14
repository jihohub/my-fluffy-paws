import React, { useState } from "react";
import Styled from "./index.styles";
import SignupImage from "../../Components/SignupImage";

const Signup = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
  };

  return (
    <Styled.SignupContainer>
      <Styled.InputContainer>
        <Styled.Label>Email 주소</Styled.Label>
        <Styled.Input type="email" />
      </Styled.InputContainer>

      <Styled.InputContainer>
        <Styled.Label>비밀번호</Styled.Label>
        <Styled.Input type="password" />
      </Styled.InputContainer>

      <Styled.InputContainer>
        <Styled.Label>비밀번호 확인</Styled.Label>
        <Styled.Input type="password" />
      </Styled.InputContainer>

      <Styled.InputContainer>
        <Styled.Label>닉네임</Styled.Label>
        <Styled.Input type="text" />
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
        <Styled.Button color="#8D7B68">가입하기</Styled.Button>
      </Styled.ButtonContainer>
    </Styled.SignupContainer>
  );
};

export default Signup;
