import React, {
  ReactNode,
  MouseEventHandler,
  RefObject,
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
        <Styled.CloseButton onClick={onClose}>+</Styled.CloseButton>
        <Styled.ModalContent>
          <Styled.ModalTitleContainer>
            <Styled.ModalTitle>댓글</Styled.ModalTitle>
          </Styled.ModalTitleContainer>
          {children}
        </Styled.ModalContent>
      </Styled.ModalContentContainer>
    </Styled.ModalContainer>
  );
};

export default Modal;
