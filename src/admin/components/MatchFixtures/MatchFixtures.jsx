import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { errorHandler, toastMessage } from "../../../helpers";
import TimePicker from "react-time-picker";

import AdminNavbar from "../adminNavbar/AdminNavbar";
import Sidebar from "../sidebar/Sidebar";
import FixturesAndResultsTable from "./FixturesAndResultsTable";
import "./MatchFixtures.css";

function MatchFixtures({ isVisible, toggleVisibility }) {
  const timezd = new Date();
  const timezd1 = timezd.toString().split(" ");
  const { token } = useSelector((state) => state.user);
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [value, setValue] = useState(timezd1[4]);
  const [fixtures, setFixtures] = useState([]);
  const [pastFix, setPastFix] = useState([]);
  const Addfixture = (e) => {
    e.preventDefault();

    const data = {
      home,
      away,
      date,
      time: value,
      stadium: location,
      token,
    };
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/fixtures", data)
      .then((res) => {
        console.log(res);
        setHome("");
        setAway("");
        setDate("");
        setLocation("");
        setValue("");
        toastMessage("success", "Fixture saved");
      })
      .catch((error) => {
        console.log("save fixure error", error);
        errorHandler(error);
      });
  };

  const fetchFixtures = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/fixtures")
      .then((res) => {
        console.log("res ult response", res);
        setFixtures(
          res.data.data.filter((item) => item.isMatchEnded === false)
        );
        setPastFix(res.data.data.filter((item) => item.isMatchEnded == true));
      })
      .catch((error) => {
        errorHandler(error);
        console.log("error from fetch all fixtures:", error);
      });
  };
  console.log("fixtures", fixtures);
  return (
    <>
      <div className='Home'>
        {isVisible && <Sidebar />}
        <div className='homeContainer'>
          <AdminNavbar toggleVisibility={toggleVisibility} />
          <div className='Fixturescontainer'>
            <div className='fixtures'>
              <h2>Enter Upcoming Fixtures</h2>
              <form onSubmit={Addfixture}>
                <label>Home Team</label>
                <input
                  type='text'
                  placeholder='Enter Home Team'
                  value={home}
                  onChange={(e) => setHome(e.target.value)}
                />
                <label>Away Team</label>
                <input
                  type='text'
                  placeholder='Enter Away Team'
                  value={away}
                  onChange={(e) => setAway(e.target.value)}
                />
                <label>Date</label>
                <input
                  type='date'
                  placeholder='Enter Date'
                  value={date}
                  min={`${timezd1[1]}/${timezd1[2]}/${timezd1[3]}]}`}
                  onChange={(e) => setDate(e.target.value)}
                />
                <label>Hour</label>
                <TimePicker onChange={setValue} value={value} />
                <label>Location</label>
                <input
                  type='text'
                  placeholder='Enter Location or stadium name'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <input type='submit' value='Save' />
              </form>
            </div>
          </div>
          <FixturesAndResultsTable
            fixtures={fixtures}
            pastFix={pastFix}
            setFixtures={setFixtures}
            setPastFix={setPastFix}
            fetchFixtures={fetchFixtures}
          />
        </div>
      </div>
    </>
  );
}

export default MatchFixtures;
