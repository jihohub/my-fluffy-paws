import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { getUserInfo, selectIsLoading } from "../../store/reducers/userSlice";
import { RootState } from "../../store/store";
import Styled from "./index.styles";
import PostGrid from "../../Components/PostGrid";
import Loading from "../../Components/Loading";
import { GiHamburgerMenu } from "react-icons/gi";
import Toast from "../../Components/Toast";

const User = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userId } = useParams<{ userId: string }>();

  const isLoading = useSelector(selectIsLoading);
  const user = useSelector((state: RootState) => state.user.otherUser);
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    // 사용자 정보와 사용자가 작성한 포스트 정보를 가져오는 액션 호출
    if (userId !== undefined) {
      dispatch(getUserInfo(parseInt(userId)));
      console.log(user);
      console.log(user);
    }
  }, [userId]);

  const handleMenuClick = () => {
    setIsToastVisible((prevState) => !prevState);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Styled.UserContainer>
      {user ? (
        <>
          <Styled.UserName>{user.userName}</Styled.UserName>
          <Styled.MenuContainer onClick={handleMenuClick}>
            <GiHamburgerMenu />
          </Styled.MenuContainer>
          <Styled.UserProfileContainer>
            <Styled.UserImage src={user.userImage} alt="Profile" />
            <Styled.UserStatContainer>
              <Styled.UserStat>{"게시물"}</Styled.UserStat>
              <Styled.UserStat>{user.posts.length}</Styled.UserStat>
            </Styled.UserStatContainer>
            <Styled.UserStatContainer>
              <Styled.UserStat>{"팔로잉"}</Styled.UserStat>
              <Styled.UserStat>{"0"}</Styled.UserStat>
            </Styled.UserStatContainer>
            <Styled.UserStatContainer>
              <Styled.UserStat>{"팔로워"}</Styled.UserStat>
              <Styled.UserStat>{"0"}</Styled.UserStat>
            </Styled.UserStatContainer>
          </Styled.UserProfileContainer>
          <Styled.PostsContainer>
            <PostGrid posts={user?.posts} />
          </Styled.PostsContainer>
          {isToastVisible && <Toast path="user" />}
        </>
      ) : (
        <></>
      )}
    </Styled.UserContainer>
  );
};

export default User;
