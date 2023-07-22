import styled, { keyframes } from "styled-components";

const slideInUpAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: end;
  justify-content: center;
  z-index: 2;
`;

const ModalContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 60%;
  // justify-content: center;
  align-items: center;
  animation: ${slideInUpAnimation} 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: #fff;
  width: 500px;
  border-radius: 4px;

  @media (max-width: 768px) {
    max-width: 100vw;
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: -40px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 50px;
  color: #8d7b68;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(45deg);
`;

export default {
  ModalContainer,
  ModalContentContainer,
  ModalContent,
  CloseButton,
};
