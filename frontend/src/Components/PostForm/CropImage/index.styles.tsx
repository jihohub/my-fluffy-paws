import styled from "styled-components";

const CropContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 70px;
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
  CropContainer,
  ButtonContainer,
  Button,
};
