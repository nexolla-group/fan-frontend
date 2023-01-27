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
import React, { useState } from "react";
import { useSelector } from "react-redux";

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

export default function AddGroup({ open, setOpen, fetchGroups }) {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const { token } = useSelector((state) => state.user);

  const handleClose = () => setOpen(false);
  const handleCreate = () => {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/groups", {
        groupName,
        description,
        target,
        token,
      })
      .then((res) => {
        setGroupName("");
        setDescription("");
        setTarget("");
        console.log(res);
        fetchGroups();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add group
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormControl variant="standard" style={{ width: "100%" }}>
              <InputLabel htmlFor="title">Goup nname</InputLabel>
              <Input
                id="component-simple"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </FormControl>
            <FormControl variant="standard" style={{ width: "100%" }}>
              <TextField
                id="standard-multiline-static"
                multiline
                label="Target Description"
                rows={4}
                variant="standard"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </FormControl>
            <FormControl variant="standard" style={{ width: "100%" }}>
              <TextField
                id="standard-multiline-static"
                type="number"
                label="Targeted amount"
                rows={4}
                variant="standard"
                onChange={(e) => setTarget(e.target.value)}
                value={target}
              />
            </FormControl>
            <Button
              variant="contained"
              onClick={handleCreate}
              style={{
                width: "100%",
                backgroundColor: "#000",
                marginTop: "1rem",
              }}
            >
              Create a group
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
