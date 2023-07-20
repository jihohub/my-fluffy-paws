import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const slideInUpAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const ToastButton = styled.button`
  background-color: #8d7b68;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 500px;
  max-width: 500px;
  background-color: #8d7b68;
  color: white;
  border-radius: 5px;
  z-index: 3;
  animation: ${slideInUpAnimation} 0.3s ease;

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const ToastUpperSlot = styled.div`
  height: 20px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #a4907c;
`;

const ToastUpperText = styled.div`
  font-size: 20px;
`;

const ToastLink = styled(Link)`
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  text-decoration: none;
  border-bottom: 1px solid #a4907c;

  svg {
    margin-left: 20px;
    font-size: 36px;
    color: #ffffff;
  }
`;

const ToastSlot = styled.div`
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #a4907c;

  svg {
    margin-left: 20px;
    font-size: 36px;
    color: #ffffff;
  }
`;

const ToastText = styled.p`
  margin-left: 20px;
  font-size: 24px;
  color: #ffffff;
`;

export default {
  ToastButton,
  ToastContainer,
  ToastUpperSlot,
  ToastUpperText,
  ToastLink,
  ToastSlot,
  ToastText,
};
