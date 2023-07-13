import styled from "styled-components";

const MainContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-weight: bold;
`;

const PostImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const PostContent = styled.p`
  margin-bottom: 10px;
`;

const CommentsContainer = styled.div`
  font-size: 14px;
  color: #777;
`;

const Comment = styled.div`
  margin-bottom: 5px;
`;

export default {
  MainContainer,
  PostContainer,
  UserContainer,
  UserImage,
  UserName,
  PostImage,
  PostContent,
  CommentsContainer,
  Comment,
};
