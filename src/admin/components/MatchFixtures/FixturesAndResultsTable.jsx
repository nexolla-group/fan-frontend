import React from "react";
import "./FixturesAndResultsTable.css";

function FixturesAndResultsTable() {
  return (
    <>
      <div className="TableContainer">
        <h2>Upcoming Fixtures</h2>
        <table className="FixturesTable">
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Home Team</th>
            <th>Away Team</th>
          </tr>
          <tr>
            <td>03/02/2023</td>
            <td>19:00</td>
            <td>Nyagatare Stadium</td>
            <td>Sunrise FC</td>
            <td>Gasogi FC</td>
          </tr>
          <tr>
            <td>04/02/2023</td>
            <td>20:30</td>
            <td>Amahoro National Stadium</td>
            <td>Rayon Sport FC</td>
            <td>Sunrise FC</td>
          </tr>
        </table>

        <h2>Recent Results</h2>
        <table>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Result</th>
          </tr>
          <tr>
            <td>01/02/2023</td>
            <td>Nyagatare Stadium</td>
            <td>Sunrise FC</td>
            <td>Gasogi FC</td>
            <td>2-2</td>
          </tr>
          <tr>
            <td>02/02/2023</td>
            <td>Amahoro National Stadium</td>
            <td>Rayon Sport FC</td>
            <td>Sunrise FC</td>
            <td>1-5</td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default FixturesAndResultsTable;
