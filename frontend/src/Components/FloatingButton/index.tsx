import React, { useEffect, useState } from "react";
import Styled from "./index.styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/reducers/userSlice";

const FloatingButtonComponent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector(selectToken);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [isOnPostForm, setIsOnPostForm] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedin(token !== null);
  }, [token]);

  useEffect(() => {
    setIsOnPostForm(location.pathname === "/post/new");
  }, [location]);

  const handleFloatingButtonClick = () => {
    navigate("/post/new");
  };

  return (
    <>
      {isLoggedin && !isOnPostForm  ? (
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
