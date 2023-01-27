import axios from "axios";
import { useEffect, useState } from "react";
import Feeds from "../../components/feeds/Feeds";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import { useParams } from "react-router";
import { Navbar } from "../../Home/Components";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Navbar />
      <div className='profile'>
        <Sidebar />
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : `${PF}people/background.png`
                }
                alt=''
                className='profileCoverImg'
              />
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : `${PF}people/user.png`
                }
                alt=''
                className='profileUserImg'
              />
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>{user.username}</h4>
              <span className='profileInfoDesc'>{user.desc}</span>
            </div>
          </div>

          <div className='profileRightBottom'>
            <Feeds username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
