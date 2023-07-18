import styled, { css } from "styled-components";

const SignupContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  margin-bottom: 80px;
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
`;

const Input = styled.input`
  width: 100%;
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
  cursor: pointer;

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}
`;

export default {
  SignupContainer,
  InputContainer,
  Label,
  Input,
  ButtonContainer,
  Button,
};
