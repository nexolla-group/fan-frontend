import Sidebar from "../../components/sidebar/Sidebar";
import Feeds from "../../components/feeds/Feeds";
import Rightbar from "../../components/rightbar/Rightbar";
import "./userHome.css";
import { Navbar } from "../../Home/Components";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className='homeContainer'>
        <Sidebar />
        <Feeds />
        <Rightbar />
      </div>
    </>
  );
}
