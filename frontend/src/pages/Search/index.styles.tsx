import styled from "styled-components";
import { BiUser } from "react-icons/bi";
import { MdOutlineArticle } from "react-icons/md";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  width: 500px;
  max-width: 500px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-top: 20px;
  border-bottom: 1px #bbb solid;
`;

const UsersTab = styled(BiUser)<{ active: boolean }>`
  width: 250px;
  max-width: 250px;
  height: 40px;
  color: ${(props) => (props.active ? "#8d7b68" : "#bbb")};
  border-bottom: ${(props) => (props.active ? "1px #8d7b68 solid" : "")};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#6c5d4b" : "#6c5d4b")};
  }

  @media (max-width: 768px) {
    width: 50vw;
  }
`;

const PostsTab = styled(MdOutlineArticle)<{ active: boolean }>`
  width: 250px;
  max-width: 250px;
  height: 40px;
  color: ${(props) => (props.active ? "#8d7b68" : "#bbb")};
  border-bottom: ${(props) => (props.active ? "1px #8d7b68 solid" : "")};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#6c5d4b" : "#6c5d4b")};
  }

  @media (max-width: 768px) {
    width: 50vw;
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  background-color: ${(props) => (props.active ? "#8d7b68" : "#ccc")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#6c5d4b" : "#bbb")};
  }
`;

const SearchResults = styled.div`

`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  color: #999;
`;

const Text = styled.p`
  font-size: 14px;
`;

export default {
  MainContainer,
  SearchContainer,
  SearchInput,
  TabContainer,
  UsersTab,
  PostsTab,
  TabButton,
  SearchResults,
  UserImage,
  UserName,
  TextContainer,
  Text,
};
