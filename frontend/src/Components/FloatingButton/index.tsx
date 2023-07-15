import React, { useEffect, useState } from "react";
import Styled from "./index.styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/reducers/userSlice";

const FloatingButtonComponent: React.FC = () => {
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedin(token !== null);
  }, [token]);

  const handleFloatingButtonClick = () => {
    navigate("/post/new");
  };

  return (
    <>
      {isLoggedin ? (
        <Styled.FloatingButtonContainer>
          <Styled.FloatingButton onClick={handleFloatingButtonClick}>
            +
          </Styled.FloatingButton>
        </Styled.FloatingButtonContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default FloatingButtonComponent;
