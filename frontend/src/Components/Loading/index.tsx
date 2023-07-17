import React from "react";
import Styled from "./index.styles";

const Loading = () => {
  return (
    <Styled.LoadingOverlay>
      <Styled.Loader />
    </Styled.LoadingOverlay>
  );
};

export default Loading;
