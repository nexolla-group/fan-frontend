import { MoreVert } from "@mui/icons-material";
import "./post.css";
import { Link } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/post/" + post._id + "/like", { userId: currentUser._id });
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "people/user.png"
                }
                alt=''
                className='postProfileimg'
              />
            </Link>
            <span className='postUsername'>{user.username}</span>
            <span className='postDate'>{format(post.createdAt)}</span>
          </div>
          <div className='postTopRight'>
            <MoreVert className='postTopRightIcon' />
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{post?.desc} </span>
          <img src={PF + post.image} alt='' className='postImg' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img
              src={`${PF}post/like.png`}
              alt=''
              className='likeIcon'
              onClick={likeHandler}
            />
            <img
              src={`${PF}post/heart.png`}
              alt=''
              className='likeIcon'
              onClick={likeHandler}
            />
            <span className='postLikeCounter'>{like} people like</span>
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'>
              {7} Comments
              {/* {post.comment.length} Comments */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
