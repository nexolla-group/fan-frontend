import React from "react";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import Sidebar from "../sidebar/Sidebar";
import FixturesAndResultsTable from "./FixturesAndResultsTable";
import "./MatchFixtures.css";

function MatchFixtures({ isVisible, toggleVisibility }) {
  return (
    <>
      <div className="Home">
        {isVisible && <Sidebar />}
        <div className="homeContainer">
          <AdminNavbar toggleVisibility={toggleVisibility} />
          <div className="Fixturescontainer">
            <div className="fixtures">
              <h2>Enter Upcoming Fixtures</h2>
              <form>
                <label>Home Team</label>
                <input type="text" placeholder="Enter Home Team" />
                <label>Away Team</label>
                <input type="text" placeholder="Enter Away Team" />
                <label>Date</label>
                <input type="text" placeholder="Enter Date" />
                <input type="submit" value="Save" />
              </form>
            </div>
            <div className="results">
              <h2>Enter Recent Results</h2>
              <form>
                <label>Home Team</label>
                <input type="text" placeholder="Enter Home Team" />
                <label>Away Team</label>
                <input type="text" placeholder="Enter Away Team" />
                <label>Result</label>
                <input type="text" placeholder="Enter Result" />
                <input type="submit" value="Save" />
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
