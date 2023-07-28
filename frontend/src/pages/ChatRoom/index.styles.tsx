import styled from "styled-components";

const ChatContainer = styled.div`
  position: relative;
  width: 500px;
  max-width: 500px;
  padding-bottom: 60px;
  min-height: 100vh;

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const UserCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 500px;
  max-width: 500px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const UserDiv = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  width: 500px;
  max-width: 500px;
  padding: 8px;
  align-items: center;
  background-color: #fff;

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

const UserName = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const BubbleContainer = styled.div`
  margin-bottom: 100px;
`;

const InputContainer = styled.div`
  position: absolute;
  bottom: 60px;
`;

const MessageFormContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: start;
  padding: 10px;
  margin-top: 500px;
  width: 500px;
  max-width: 500px;

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  max-width: 500px;
  align-items: end;

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 40px;
  padding: 10px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
`;

const CharCount = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #aaa;
`;

const ButtonContainer = styled.div`
  // margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  // padding: 10px 20px;
  width: 50px;
  height: 40px;
  background-color: ${(props) => props.color};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};

  svg {
    font-size: 20px;
  }
`;

export default {
  ChatContainer,
  UserCard,
  UserDiv,
  UserImage,
  UserName,
  BubbleContainer,
  InputContainer,
  MessageFormContainer,
  MessageContainer,
  Textarea,
  CharCount,
  ButtonContainer,
  Button,
};
