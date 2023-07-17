import styled from "styled-components";

const PostImageContainer = styled.div`
  position: relative;
  width: 400px;
  max-width: 400px;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
  &:hover {
    opacity: 0.5;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EmptyImage = styled.div`
  width: 100%;
  height: 100%;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: visible;
  &:hover {
    opacity: 1;
  }
`;

const ImageInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const HoverText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000;
  background-color: #fff;
  font-size: 16px;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${PostImageContainer}:hover & {
    opacity: 1;
    pointer-events: none;
  }
`;

const AfterUpload = styled.div`

`;

export default {
  PostImageContainer,
  PreviewImage,
  EmptyImage,
  ImageInput,
  HoverText,
  AfterUpload,
};
