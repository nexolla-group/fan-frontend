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
export default function EditGroup({ open, setOpen, group, fetchGroups }) {
  const [groupName, setGroupName] = useState(group.groupName);
  const [description, setDescription] = useState(group.description);

  const handleClose = () => setOpen(false);
  const handleEdit = () => {
    axios
      .put(process.env.REACT_APP_BACKEND_URL + "/api/groups/" + group._id, {
        groupName,
        description,
      })
      .then((res) => {
        toastMessage("success", "Group is Updated");
        fetchGroups();
        handleClose();
      })
      .catch((error) => console.log(error));
    console.log(group);
  };

  useEffect(() => {
    setGroupName(group.groupName);
    setDescription(group.description);
  }, [group]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Modify Group
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <FormControl variant='standard' style={{ width: "100%" }}>
              <InputLabel htmlFor='title'>Goup nname</InputLabel>
              <Input
                id='component-simple'
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </FormControl>
            <FormControl variant='standard' style={{ width: "100%" }}>
              <TextField
                id='standard-multiline-static'
                multiline
                label='Target Description'
                rows={4}
                variant='standard'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </FormControl>
            <FormControl variant='standard' style={{ width: "100%" }}>
              <TextField
                id='standard-multiline-static'
                type='number'
                label='Targeted amount'
                rows={4}
                variant='standard'
                value={group.target}
                disabled
              />
            </FormControl>
            <Button
              variant='contained'
              onClick={handleEdit}
              style={{
                width: "100%",
                backgroundColor: "#000",
                marginTop: "1rem",
              }}
            >
              Update group
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
