import React from "react";
import Styled, { ButtonProps } from "./index.styles";

const Button: React.FC<ButtonProps> = ({ color, text, onClick }) => {
  return (
    <Styled.Button color={color} onClick={onClick}>
      {text}
    </Styled.Button>
  );
};

export default Button;
