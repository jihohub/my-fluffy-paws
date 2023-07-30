import styled from "styled-components";

export interface DivProps {
  isOwnMessage: boolean;
}

const Wrapper = styled.div<DivProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) =>
    props.isOwnMessage ? "flex-end" : "flex-start"};
  width: 500px;
  max-width: 500px;

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const BubbleDiv = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isOwnMessage ? "flex-end" : "flex-start")};
  width: 250px;
  height: 100%;
  margin: 10px;
  margin-bottom: 20px;
`;

const BubbleText = styled.p<DivProps>`
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  background-color: ${(props) => (props.isOwnMessage ? "#bfe6ff" : "#ffe5ec")};
  border-radius: 16px;
`;

const BubbleDate = styled.p`
  font-size: 12px;
`;

export default {
  Wrapper,
  BubbleDiv,
  BubbleText,
  BubbleDate,
};
