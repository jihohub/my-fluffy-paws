import styled from "styled-components";

const FloatingButtonContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 600px;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  pointer-events: none;
`;

const FloatingButton = styled.button`
  width: 60px;
  height: 60px;
  margin: 30px;
  border-radius: 50%;
  background-color: #8d7b68;
  color: white;
  font-size: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
`;

export default { FloatingButtonContainer, FloatingButton };
