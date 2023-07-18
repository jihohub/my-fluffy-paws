import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  width: 600px;
  padding: 20px;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 90vw;
    padding: 10px;
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