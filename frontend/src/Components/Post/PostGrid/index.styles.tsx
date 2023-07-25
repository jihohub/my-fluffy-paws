import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsHeartFill } from "react-icons/bs";
import { FaComment } from "react-icons/fa";

const PostContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 80px;
  padding: 10px;
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
  display: flex;
  gap: 10px;
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
  color: white;
  font-size: 14px;
  display: none;
  z-index: 2;

  ${HoverContainer}:hover & {
    display: block;
  }
`;

const PostLikeCount = styled.p`
  color: white;
  font-size: 14px;
  display: none;
  z-index: 2;

  ${HoverContainer}:hover & {
    display: block;
  }
`;

const HeartFillIcon = styled(BsHeartFill)`
  color: white;
`;

const CommentIcon = styled(FaComment)`
  color: white;
`;

export default {
  PostContainer,
  HoverContainer,
  PostImage,
  PostHover,
  PostLikeCount,
  PostCommentCount,
  HeartFillIcon,
  CommentIcon,
};
