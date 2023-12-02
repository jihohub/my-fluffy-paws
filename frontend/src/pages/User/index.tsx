import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getUserInfo } from "../../store/reducers/userSlice";
import Styled from "./index.styles";
import UserContainer from "../../Components/User/UserContainer";

const User = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userId } = useParams<{ userId: string }>();
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  useEffect(() => {
    // 사용자 정보와 사용자가 작성한 포스트 정보를 가져오는 액션 호출
    if (userId !== undefined) {
      dispatch(getUserInfo(parseInt(userId)));
    }
  }, [userId]);

  const handleMenuClick = () => {
    setIsToastVisible((prevState) => !prevState);
  };

  return (
    <Styled.UserContainer>
      <UserContainer
        userContainerProps={{
          handleMenuClick,
          isToastVisible,
        }}
      />
    </Styled.UserContainer>
  );
};

export default User;
