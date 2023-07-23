import styled from "styled-components";

const SignupImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  overflow: hidden;
  &:hover {
    opacity: 0.5;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;  
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

  ${SignupImageContainer}:hover & {
    opacity: 1;
    pointer-events: none;
  }
`;

export default { SignupImageContainer, PreviewImage, ImageInput, HoverText };
