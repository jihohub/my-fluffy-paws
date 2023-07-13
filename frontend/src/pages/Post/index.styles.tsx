import styled from "styled-components";

const PostContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const PostTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const PostAuthor = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
`;

const PostImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  margin-bottom: 5px;
`;

export default {
  PostContainer,
  PostTitle,
  PostAuthor,
  PostImage,
  CommentList,
  CommentItem,
};
