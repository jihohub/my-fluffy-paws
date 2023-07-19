import styled from "styled-components";

const EditFormContainer = styled.div`
  margin: 0 auto;
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  margin-top: 150px;
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
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.color};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;

export default {
  EditFormContainer,
  InputContainer,
  TextContainer,
  Textarea,
  CharCount,
  ButtonContainer,
  Button,
};
