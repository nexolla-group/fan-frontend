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
import { useSelector } from "react-redux";
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
export default function EditPost({ open, setOpen, post, fetchPost }) {
  const { token } = useSelector((state) => state.user);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.desc);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);
  const handleEdit = (id) => {
    setLoading(true);
    axios
      .put(process.env.REACT_APP_BACKEND_URL + "/api/post/" + id, {
        title,
        desc: description,
        token,
      })
      .then((res) => {
        toastMessage("success", "Post is Updated");
        fetchPost();
        setLoading(false);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    setTitle(post.title);
    setDescription(post.desc);
  }, [post]);
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
            Modify POST
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <FormControl variant='standard' style={{ width: "100%" }}>
              <InputLabel htmlFor='title'>Post Title</InputLabel>
              <Input
                id='component-simple'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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

            <Button
              variant='contained'
              onClick={() => handleEdit(post._id)}
              style={{
                width: "100%",
                backgroundColor: "#000",
                marginTop: "1rem",
              }}
            >
              {loading ? "Updating..." : "Update post"}
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
