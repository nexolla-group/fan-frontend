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
  // const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [value, onChange] = useState(timezd1[4]);

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
        onChange("");
        toastMessage("success", "Fixture saved");
      })
      .catch((error) => {
        console.log("save fixure error", error);
        errorHandler(error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/fixtures/?token=" + token)
      .then((res) => console.log("first", res))
      .catch((error) => console.log(error));
    // axios.put(process.env.REACT_APP_BACKEND_URL+"/api/fixtures")
  };

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
                <TimePicker onChange={onChange} value={value} />
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
            <div className='results'>
              <h2>Enter Recent Results</h2>
              <form>
                <label>Home Team</label>
                <input type='text' placeholder='Enter Home Team' />
                <label>Away Team</label>
                <input type='text' placeholder='Enter Away Team' />
                <label>Result</label>
                <input type='text' placeholder='Enter Result' />
                <label>Location</label>
                <input
                  type='text'
                  placeholder='Enter Location or stadium name'
                />
                <input type='submit' value='Save' onClick={handleUpdate} />
              </form>
            </div>
          </div>
          <FixturesAndResultsTable />
        </div>
      </div>
    </>
  );
}

export default MatchFixtures;
