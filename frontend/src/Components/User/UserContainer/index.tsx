import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  User,
  selectUser,
} from "../../../store/reducers/userSlice";
import {
  followUser,
  unfollowUser,
} from "../../../store/reducers/followSlice";
import { selectAccessToken } from "../../../store/reducers/tokenSlice";
import Styled from "./index.styles";
import { GiHamburgerMenu } from "react-icons/gi";
import PostGrid from "../../Post/PostGrid";
import Toast from "../../Toast";

export interface UserContainerProps {
  userContainerProps: {
    user: User | null;
    // followings: User["followings"];
    // followers: User["followers"];
    handleMenuClick: () => void;
    isToastVisible: boolean;
  };
}

const UserContainer: React.FC<UserContainerProps> = ({
  userContainerProps
}) => {
  const { user, handleMenuClick, isToastVisible } =
    userContainerProps;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const loggedinUser = useSelector(selectUser);
  const token = useSelector(selectAccessToken);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    console.log(user?.followers);
    user &&
      setIsFollowing(
        user?.followers.some(
          (follower) => follower.User.userId === loggedinUser?.userId
        )
      );
  }, [user]);

  // const isFollowing = followers
  //   ? followers.some(
  //       (follower) => follower.User.userId === loggedinUser?.userId
  //     )
  //   : false;

  const handleFollow = () => {
    if (user && loggedinUser) {
      // 현재 사용자가 이미 해당 사용자를 팔로우하고 있는지 확인합니다.
      if (isFollowing) {
        // 이미 팔로우 중인 경우 언팔로우를 실행합니다.
        dispatch(unfollowUser({ followerId: user.userId, token }));
        // 팔로우 또는 언팔로우 후 isFollowing 상태 업데이트
        setIsFollowing(false);
      } else {
        // 팔로우하지 않은 경우 팔로우를 실행합니다.
        dispatch(followUser({ followerId: user.userId, token }));
        // 팔로우 또는 언팔로우 후 isFollowing 상태 업데이트
        setIsFollowing(true);
      }
    }
  };

  return (
    <>
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
              <Styled.UserStat>{user.followings?.length}</Styled.UserStat>
            </Styled.UserStatContainer>
            <Styled.UserStatContainer>
              <Styled.UserStat>{"팔로워"}</Styled.UserStat>
              <Styled.UserStat>{user.followers?.length}</Styled.UserStat>
            </Styled.UserStatContainer>
          </Styled.UserProfileContainer>
          {loggedinUser && loggedinUser?.userId !== user.userId && (
            <Styled.ButtonsContainer>
              {!isFollowing ? (
                <Styled.FollowButton onClick={handleFollow}>
                  팔로우
                </Styled.FollowButton>
              ) : (
                <Styled.FollowButton onClick={handleFollow}>
                  언팔로우
                </Styled.FollowButton>
              )}
              <Styled.MessageButton>메시지</Styled.MessageButton>
            </Styled.ButtonsContainer>
          )}
          <Styled.PostsContainer>
            <PostGrid posts={user?.posts} />
          </Styled.PostsContainer>
          {isToastVisible && <Toast toastProps={{ path: "user" }} />}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserContainer;