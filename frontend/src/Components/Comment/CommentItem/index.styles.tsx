import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical, BsHeart, BsHeartFill } from "react-icons/bs";

const Wrapper = styled.div`
  height: 30vh;
  overflow: auto;
`;

const CommentItem = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 600px;
  min-height: 40px;
  padding: 10px;
  margin-bottom: 5px;
`;

const LinkContainer = styled(Link)``;

const CommentUserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: 5px;
  margin-right: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 40px;
`;

const UpperContainer = styled.div`
  display: flex;
  height: 20px;
`;

const CommentUserName = styled.p`
  font-size: 14px;
  margin-right: 5px;
`;

const CommentDate = styled.p`
  font-size: 14px;
`;

const LowerContainer = styled.div`
  min-height: 20px;
`;

const CommentText = styled.div`
  margin-left: 10px;
  word-break: break-all;
  padding-right: 30px;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 35px;
`;

const LikeConatainer = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  flex-direction: column;
`;

const LikeCount = styled.p`
  font-size: 12px;
  color: #888;
  margin-left: 4px;
`;

const HeartConatainer = styled.div`
  // padding-left: 10px;
`;

const DotIcon = styled(BsThreeDotsVertical)`

`;

const HeartIcon = styled(BsHeart)`
  color: #000000;
`;

const HeartFillIcon = styled(BsHeartFill)`
  color: #dc143c;
`;

export default {
  Wrapper,
  CommentItem,
  LinkContainer,
  CommentUserImage,
  TextContainer,
  UpperContainer,
  CommentUserName,
  CommentDate,
  LowerContainer,
  CommentText,
  IconContainer,
  LikeConatainer,
  LikeCount,
  HeartConatainer,
  DotIcon,
  HeartIcon,
  HeartFillIcon,
};
