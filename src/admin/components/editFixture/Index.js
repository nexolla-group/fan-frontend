import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toastMessage } from "../../../helpers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function EditFixture({ open, setOpen, fixture, fetchGroups }) {
  const [fixtureName, setGroupName] = useState(fixture.fixtureName);
  const [description, setDescription] = useState(fixture.description);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);
  const handleEdit = () => {
    setLoading(true);
    axios
      .put(process.env.REACT_APP_BACKEND_URL + "/api/fixtures/" + fixture._id, {
        fixtureName,
        description,
      })
      .then((res) => {
        toastMessage("success", "Group is Updated");
        fetchGroups();
        setLoading(false);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    setGroupName(fixture.fixtureName);
    setDescription(fixture.description);
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
              <input type='text' placeholder='Enter Location or stadium name' />
              <input type='submit' value='Save' onClick={handleUpdate} />
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
