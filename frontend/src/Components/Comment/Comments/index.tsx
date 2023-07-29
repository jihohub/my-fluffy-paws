import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Styled from "./index.styles";
import { selectUser } from "../../../store/reducers/userSlice";
import Toast from "../../Toast";
import Modal from "../../Modal";
import CommentsContainer from "../CommentsContainer";
import CommentForm from "../CommentForm";

export interface CommentsContainerProps {
  commentsProps: {
    postId: number;
    commentCount: number;
  };
}

const Comments: React.FC<CommentsContainerProps> = ({ commentsProps }) => {
  const { postId, commentCount } = commentsProps;
  const countText = commentCount > 0 && `댓글 ${commentCount}개 보기`;

  const user = useSelector(selectUser);

  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Styled.CommentContainer>
      <Styled.CountText onClick={handleOpenModal}>{countText}</Styled.CountText>
      {isToastVisible && <Toast toastProps={{ path: "user" }} />}
      {isModalVisible && (
        <Modal onClose={handleCloseModal} modalRef={modalRef}>
          <CommentsContainer postId={postId} />
          {user && <CommentForm postId={postId} />}
        </Modal>
      )}
    </Styled.CommentContainer>
  );
};

export default Comments;
