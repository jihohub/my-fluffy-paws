import styled from "styled-components";

const CommentFormContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: start;
  padding: 10px;
  border-top: 1px #dddddd solid;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  align-items: end;
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
  CommentFormContainer,
  CommentContainer,
  Textarea,
  CharCount,
  ButtonContainer,
  Button,
};
