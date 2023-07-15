import React, { useState, ChangeEvent } from "react";
import Styled from "./index.styles";

interface SignupImageProps {
  imageUrl?: string;
  onChange: (file: File | null) => void;
}

const SignupImage: React.FC<SignupImageProps> = ({ imageUrl, onChange }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedImage(file);
    onChange(file);
  };

  return (
    <Styled.SignupImageContainer>
      {imageUrl && <Styled.PreviewImage src={imageUrl} alt="미리보기" />}
      <Styled.ImageInput
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <Styled.HoverText>이미지 변경</Styled.HoverText>
    </Styled.SignupImageContainer>
  );
};

export default SignupImage;
