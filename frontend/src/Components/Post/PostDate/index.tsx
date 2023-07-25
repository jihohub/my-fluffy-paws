import React from "react";
import Styled from "./index.styles";
import moment from "moment";
import "moment/locale/ko";

export interface PostDateProps {
  createdAt: Date;
}

const PostDate: React.FC<PostDateProps> = ({ createdAt }) => {
  return (
    <Styled.DateContainer>
      <Styled.PostDate>{moment(createdAt).fromNow()}</Styled.PostDate>
    </Styled.DateContainer>
  );
};

export default PostDate;
