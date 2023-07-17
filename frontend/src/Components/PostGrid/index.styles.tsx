import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaComment } from "react-icons/fa";

const PostContainer = styled.div`
  position: relative;
  display: grid;
  max-width: 600px;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 10px;
`;

const HoverContainer = styled(Link)`
  position: relative;
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PostHover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;

  ${HoverContainer}:hover & {
    opacity: 1;
  }
`;

const PostCommentCount = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px;
  display: none;
  margin-left: 10px;
  z-index: 2;

  ${HoverContainer}:hover & {
    display: block;
  }
`;

const CommentIcon = styled(FaComment)`
  margin-right: 20px;
`;

export default {
  PostContainer,
  HoverContainer,
  PostImage,
  PostHover,
  PostCommentCount,
  CommentIcon,
};
