import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { errorHandler } from "../../../helpers";
import "./FixturesAndResultsTable.css";

function FixturesAndResultsTable() {
  const { token } = useSelector((state) => state.user);
  const [fixtures, setFixtures] = useState([]);
  const [pastFix, setPastFix] = useState([]);
  const [loading, setLoding] = useState(false);
  const fetchFixtures = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/fixtures/?token=" + token)
      .then((res) => {
        console.log("res ult response", res);
        setFixtures(
          res.data.data.filter((item) => item.isMatchEnded === false)
        );
        // setPastFix(res.data.data.filter((item) => item.isMatchEnded == "true"));
      })
      .catch((error) => {
        errorHandler(error);
        console.log("error from fetch all fixtures:", error);
      });
  };

  useEffect(() => {
    fetchFixtures();
  }, []);

  return (
    <>
      <div className='TableContainer'>
        <h2>Upcoming Fixtures</h2>
        {fixtures.length < 1 ? (
          <h4 style={{ paddingBottom: "30px" }}>
            No Upcoming Fixtures Available!!
          </h4>
        ) : (
          <table className='FixturesTable'>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Home Team</th>
              <th>Away Team</th>
            </tr>
            {fixtures.map((item, i) => (
              <tr key={i}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.time}</td>
                <td>{item.stadium}</td>
                <td>{item.home}</td>
                <td>{item.away}</td>
              </tr>
            ))}
          </table>
        )}

        <h2>Recent Results</h2>

        {pastFix.length < 1 ? (
          <h4 style={{ paddingBottom: "30px" }}>No Fixtures Available!!</h4>
        ) : (
          <table>
            <tr>
              <th>Date</th>
              <th>Location</th>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Result</th>
            </tr>
            {pastFix.map((item, i) => (
              <tr key={i}>
                <td>{item.date}</td>
                <td>{item.stadium}</td>
                <td>{item.home}</td>
                <td>{item.away}</td>
                <td>{`${item.homeResult} - ${item.awayResult}`}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </>
  );
}

export default FixturesAndResultsTable;
