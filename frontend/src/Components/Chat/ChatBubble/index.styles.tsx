import styled from "styled-components";

export interface DivProps {
  isOwnMessage: boolean;
}

const BubbleContainer = styled.div`
  position: relative;
  width: 500px;
  max-width: 500px;
  height: 50px;
  // padding: 8px;
  border-radius: 16px;
  margin-top: 8px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const BubbleDiv = styled.div<DivProps>`
  position: absolute;
  right: ${(props) => (props.isOwnMessage ? 0 : "")};
  left: ${(props) => (props.isOwnMessage ? "" : 0)};
  background-color: ${(props) => (props.isOwnMessage ? "skyblue" : "pink")};
  height: 50px;
  width: 250px;
`;

const BubbleText = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

export default {
  BubbleContainer,
  BubbleDiv,
  BubbleText,
};
