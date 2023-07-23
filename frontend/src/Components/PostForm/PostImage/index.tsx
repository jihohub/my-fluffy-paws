import React, { ChangeEvent } from "react";
import Styled from "./index.styles";

interface PostImageProps {
  imageUrl?: string;
  onChange: (file: File | null) => void;
}

const PostImage: React.FC<PostImageProps> = ({ imageUrl, onChange }) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    onChange(file);
  };

  return (
    <Styled.PostImageContainer>
      {imageUrl !== "empty" ? (
        <Styled.PreviewImage src={imageUrl} alt="미리보기" />
      ) : (
        <Styled.EmptyImage>{"이미지 업로드"}</Styled.EmptyImage>
      )}
      <Styled.ImageInput
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {imageUrl !== "empty" && <Styled.HoverText>이미지 변경</Styled.HoverText>}
    </Styled.PostImageContainer>
  );
};

export default PostImage;
