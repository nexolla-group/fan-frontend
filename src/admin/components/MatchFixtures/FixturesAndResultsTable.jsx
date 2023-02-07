import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { errorHandler, toastMessage } from "../../../helpers";
import EditFixture from "../editFixture/EditFixtures";
import "./FixturesAndResultsTable.css";

function FixturesAndResultsTable() {
  const [openEdit, setOpenEdit] = React.useState(false);
  const { token, role } = useSelector((state) => state.user);
  const [fixtures, setFixtures] = useState([]);
  const [pastFix, setPastFix] = useState([]);
  const [loading, setLoding] = useState(false);
  const [fixtureToEdit, setFixtureToEdit] = useState([]);

  const fetchFixtures = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/fixtures/?token=" + token)
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

  useEffect(() => {
    fetchFixtures();
  }, []);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleDeleteFixture = (id) => {
    axios
      .delete(
        process.env.REACT_APP_BACKEND_URL +
          "/api/fixtures/" +
          id +
          "/?token=" +
          token
      )
      .then((res) => {
        toastMessage("success", "fixture deleted!");
        setFixtures(fixtures.filter((item) => item._id != id));
      })
      .catch((error) => {
        console.log(error);
        errorHandler(error);
      });
  };
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
              {role == "admin" ? <th>Action</th> : ""}
            </tr>
            {fixtures.map((item, i) => (
              <tr key={i}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.time}</td>
                <td>{item.stadium}</td>
                <td>{item.home}</td>
                <td>{item.away}</td>
                {role == "admin" ? (
                  <td>
                    <Edit
                      onClick={() => {
                        handleOpenEdit();
                        setFixtureToEdit(item);
                      }}
                    />{" "}
                    &nbsp;&nbsp;&nbsp;
                    <Delete onClick={() => handleDeleteFixture(item._id)} />
                  </td>
                ) : (
                  ""
                )}
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
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.stadium}</td>
                <td>{item.home}</td>
                <td>{item.away}</td>
                <td>{`${item.homeResult} - ${item.awayResult}`}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
      <EditFixture
        open={openEdit}
        setOpen={setOpenEdit}
        fixture={fixtureToEdit}
        fetchFixtures={fetchFixtures}
      />
    </>
  );
}

export default FixturesAndResultsTable;
