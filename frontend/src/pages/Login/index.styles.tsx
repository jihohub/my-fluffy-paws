import styled from "styled-components";
import { Link } from "react-router-dom";

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  margin-top: 200px;
  padding: 20px;
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
`;

const SignupButtonContainer = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const SignupLink = styled(Link)`
  color: #8d7b68;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default {
  LoginContainer,
  InputContainer,
  Label,
  Input,
  ButtonContainer,
  Button,
  SignupButtonContainer,
  SignupLink,
};
