import { Box, Modal } from "@mui/material";
import "./editFixture.css";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toastMessage } from "../../../helpers";
import { Home } from "@mui/icons-material";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function EditFixture({ open, setOpen, fixture, fetchFixtures }) {
  const { token } = useSelector((state) => state.user);
  const [home, setHome] = useState(fixture.home);
  const [away, setAway] = useState(fixture.away);
  const [homeResult, setHomeResult] = useState("");
  const [awayResult, setAwayResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(fixture.stadium);

  const handleClose = () => setOpen(false);
  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(process.env.REACT_APP_BACKEND_URL + "/api/fixtures/" + fixture._id, {
        home,
        away,
        awayResult,
        homeResult,
        stadium: location,
        isMatchEnded: true,
        token,
      })
      .then((res) => {
        toastMessage("success", "fixture is Updated");
        fetchFixtures();
        setLoading(false);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log(fixture);
    setHome(fixture.home);
    setAway(fixture.away);
    setLocation(fixture.stadium);
  }, [fixture]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className='Fixturescontainer'>
            <div className='fixtures' style={{ width: "60vw" }}>
              <div className='results'>
                <h2>Enter Recent Results</h2>
                <form>
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
                  <label>Home Result</label>
                  <input
                    type='text'
                    placeholder='Enter Result'
                    value={homeResult}
                    onChange={(e) => setHomeResult(e.target.value)}
                  />
                  <label>Away Result</label>
                  <input
                    type='text'
                    placeholder='Enter Result'
                    value={awayResult}
                    onChange={(e) => setAwayResult(e.target.value)}
                  />
                  <label>Location</label>
                  <input
                    type='text'
                    placeholder='Enter Location or stadium name'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <input type='submit' value='Save' onClick={handleEdit} />
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
