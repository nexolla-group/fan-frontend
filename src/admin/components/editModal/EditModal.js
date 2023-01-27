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
export default function EditModal({ open, setOpen, selectedItem }) {
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState(selectedItem.taskTitle);
  const [description, setDescription] = useState(selectedItem.taskDescription);
  const [taskDeadline, setTaskDeadline] = useState(selectedItem.taskDeadline);
  const handleUpdate = () => {
    axios
      .put(process.env.REACT_APP_BACKEND_URL + "/api/tasks/" + selectedItem._id)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Edit Target
        </Typography>
        <Box
          component='form'
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete='off'
        >
          <FormControl variant='standard' style={{ width: "100%" }}>
            <InputLabel htmlFor='title'>Title</InputLabel>
            <Input
              id='component-simple'
              defaultValue={selectedItem.taskTitle}
            />
          </FormControl>
          <FormControl variant='standard' style={{ width: "100%" }}>
            {/* <InputLabel htmlFor=''>Description</InputLabel> */}
            <TextField
              id='standard-multiline-static'
              multiline
              label='Target Description'
              rows={4}
              variant='standard'
              defaultValue={selectedItem.taskDescription}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </FormControl>
          <FormControl variant='standard' style={{ width: "100%" }}>
            <InputLabel htmlFor='Balance'>Balance</InputLabel>
            <Input
              id='component-simple'
              defaultValue={selectedItem.balance}
              disabled
            />
          </FormControl>
          <FormControl variant='standard' style={{ width: "100%" }}>
            <InputLabel htmlFor='component-simple'>Maximum Amount</InputLabel>
            <Input
              id='component-simple'
              disabled
              defaultValue={selectedItem.maximumAmount}
            />
          </FormControl>
          <FormControl variant='standard' style={{ width: "100%" }}>
            <InputLabel htmlFor='component-simple'>
              Current Percentage
            </InputLabel>
            <Input
              disabled
              id='component-simple'
              defaultValue={selectedItem.currentPercent}
            />
          </FormControl>
          <FormControl variant='standard' style={{ width: "100%" }}>
            <InputLabel htmlFor='component-simple'>Dead Line</InputLabel>
            <Input
              id='component-simple'
              defaultValue={selectedItem.taskDeadline}
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
            />
          </FormControl>
          <Button
            variant='contained'
            onClick={handleUpdate}
            style={{ width: "100%" }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
