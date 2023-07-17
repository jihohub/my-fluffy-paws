import styled from "styled-components";

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const CommentUserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const CommentUserName = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const CommentContent = styled.span`
  margin-left: 10px;
`;

const CommentDate = styled.span`
  position: absolute;
  right: 10px;
`;

export default {
  CommentList,
  CommentItem,
  CommentUserImage,
  CommentUserName,
  CommentContent,
  CommentDate,
};
