import styled from "styled-components";

const CropContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 70px;

  @media (max-width: 768px) {
    width: 100vw;
  }
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
