import styled from "styled-components";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

const HeartIcon = styled(BsHeart)`
  color: #000000;
`;

const HeartFillIcon = styled(BsHeartFill)`
  color: #DC143C;
`;

const CommentIcon = styled(FaRegComment)`
  margin-left: 10px;
  color: #000000;
`;

export default {
  HeartIcon,
  HeartFillIcon,
  CommentIcon,
};
