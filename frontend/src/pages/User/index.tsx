import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  getUserInfo,
  selectIsLoading,
} from "../../store/reducers/userSlice";
import { RootState } from "../../store/store";
import Styled from "./index.styles";
import UserContainer from "../../Components/User/UserContainer";
import PostGrid from "../../Components/Post/PostGrid";
import Loading from "../../Components/Loading";
import { GiHamburgerMenu } from "react-icons/gi";
import Toast from "../../Components/Toast";

const User = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userId } = useParams<{ userId: string }>();

  const isLoading = useSelector(selectIsLoading);
  const user = useSelector((state: RootState) => state.user.userOnProfile);
  const [isToastVisible, setIsToastVisible] = useState(false);


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
          user, handleMenuClick, isToastVisible
        }}
      />
    </Styled.UserContainer>
  );
};

export default User;
