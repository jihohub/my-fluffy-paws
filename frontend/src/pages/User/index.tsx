import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useParams, useNavigate } from "react-router-dom";
import { getUserInfo, selectIsLoading, logout } from "../../store/reducers/userSlice";
import { RootState } from "../../store/store";
import Styled from "./index.styles";
import PostGrid from "../../Components/PostGrid";
import Button from "../../Components/Button";
import Loading from "../../Components/Loading";
import { GiHamburgerMenu } from "react-icons/gi";
import Toast from "../../Components/Toast";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userId } = useParams<{ userId: string }>();

  const isLoading = useSelector(selectIsLoading);
  const myUserId = useSelector((state: RootState) => state.user.user?.userId);
  const user = useSelector((state: RootState) => state.user.otherUser);

  const handleLogoutClick = async () => {
    await dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    // 사용자 정보와 사용자가 작성한 포스트 정보를 가져오는 액션 호출
    if (userId !== undefined) {
      dispatch(getUserInfo(parseInt(userId)));
    }
  }, [userId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Styled.UserContainer>
      {user ? (
        <>
          <Styled.UserName>{user.userName}</Styled.UserName>
          <Styled.MenuContainer>
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
          {myUserId === user.userId && (
            <Button
              color={"#8D7B68"}
              text="로그아웃"
              onClick={handleLogoutClick}
            />
          )}
          <Styled.PostsContainer>
            <PostGrid posts={user?.posts} />
          </Styled.PostsContainer>
          <Toast />
        </>
      ) : (
        <></>
      )}
    </Styled.UserContainer>
  );
};

export default User;
