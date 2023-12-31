import styled from "styled-components";
import { Link } from "react-router-dom";

const CommentContainer = styled.div`
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

const LinkContainer = styled(Link)`
`;

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
  right: 15px;
`;

const LikesContainer = styled.div`
  margin-top: 8px;
`;

const LikesCount = styled.span`
  font-size: 14px;
  color: #888;
  margin-top: 4px;
`;

const HeartContainer = styled.div`
  padding-left: 50px;
`;

export default {
  CommentContainer,
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
  LikesContainer,
  LikesCount,
  HeartContainer,
};
