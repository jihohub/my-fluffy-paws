import React, {
  ReactNode,
  MouseEventHandler,
  RefObject,
  useEffect,
} from "react";
import Styled from "./index.styles";

interface ModalProps {
  onClose: MouseEventHandler;
  children: ReactNode;
  modalRef: RefObject<HTMLDivElement>;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, modalRef }) => {
  return (
    <Styled.ModalContainer>
      <Styled.ModalContentContainer ref={modalRef}>
        <Styled.ModalContent>{children}</Styled.ModalContent>
        <Styled.CloseButton onClick={onClose}>+</Styled.CloseButton>
      </Styled.ModalContentContainer>
    </Styled.ModalContainer>
  );
};

export default Modal;
