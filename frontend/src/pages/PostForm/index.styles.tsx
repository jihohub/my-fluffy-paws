import styled from "styled-components";

const PostFormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
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

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 600px;
  max-width: 600px;
  height: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  Label,
  Input,
  ButtonContainer,
  Button,
};
