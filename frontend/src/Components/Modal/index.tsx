import React, { ReactNode, MouseEventHandler } from "react";
import Styled from "./index.styles";

interface ModalProps {
  onClose: MouseEventHandler;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <Styled.ModalContainer>
      <Styled.ModalContentContainer>
        <Styled.ModalContent>{children}</Styled.ModalContent>
        <Styled.CloseButton onClick={onClose}>+</Styled.CloseButton>
      </Styled.ModalContentContainer>
    </Styled.ModalContainer>
  );
};

export default Modal;
