import styled from "styled-components";

const CommentFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  width: 100px;
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #8d7b68;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #634f3b;
  }
`;

export default {
  CommentFormContainer,
  Textarea,
  SubmitButton,
};
