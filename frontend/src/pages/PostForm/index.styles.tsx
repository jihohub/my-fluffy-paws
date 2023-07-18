import styled from "styled-components";

const PostFormContainer = styled.div`
  max-width: 600px;
  margin: auto 0;
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
`;

const UploadImageArea = styled.div`
  width: 100%;
  height: 100%;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TextContainer = styled.div`
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
  PostFormContainer,
  InputContainer,
  UploadImageArea,
  TextContainer,
  Textarea,
  ButtonContainer,
  Button,
};
