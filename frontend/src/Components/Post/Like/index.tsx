import React from "react";
import Styled from "./index.styles";

export interface LikeContainerProps {
  likeProps: {
    likeCount: number;
    likedUser: {
      userId: number;
      User: {
        userId: number;
        userName: string;
        userImage: string;
      };
    }[];
  };
}

const Like: React.FC<LikeContainerProps> = ({ likeProps }) => {
  const { likeCount, likedUser } = likeProps;
  const countText = likeCount > 0 && `좋아요 ${likeCount}개`;

  return <Styled.CountText>{countText}</Styled.CountText>;
};

export default Like;
