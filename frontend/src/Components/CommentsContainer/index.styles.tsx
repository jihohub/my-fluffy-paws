import styled from "styled-components";

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const CommentUserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const CommentUserName = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const CommentContent = styled.span``;

export default {
  CommentList,
  CommentItem,
  CommentUserImage,
  CommentUserName,
  CommentContent,
};
