import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  return (
    <div className='conversation'>
      <img
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "people/user.png"
        }
        alt=''
        className='conversationImg'
      />
      <div className='conversationName'>{user?.username}</div>
    </div>
  );
}
