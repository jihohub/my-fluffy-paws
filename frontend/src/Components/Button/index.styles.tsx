import styled from "styled-components";

export interface ButtonProps {
  color: string;
  text?: string;
  onClick?: () => void;
}

const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props.color};
  color: white;
  width: 70px;
  height: 35px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default { Button };
