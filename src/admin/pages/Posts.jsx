import React, { useState } from "react";
import AdminNavbar from "../components/adminNavbar/AdminNavbar";
import Sidebar from "../components/sidebar/Sidebar";
import "./posts.css";

import Fab from "@mui/material/Fab";
import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));
const Posts = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to save the blog to the database
  };
  const classes = useStyles();
  return (
    <div className='Home'>
      <Sidebar />
      <div className='homeContainer'>
        <AdminNavbar />
        <div className='row'>
          <div className='col col-md-6 col-sm-12 col-12'>
            {" "}
            <div className='blog-container'>
              <h1 className='blog-title'>Add a Blog Post</h1>
              <form
                className={`d-block bordered ${classes.root}`}
                noValidate
                autoComplete='off'
              >
                <div>
                  <TextField
                    id='title'
                    label='Title'
                    variant='outlined'
                    placeholder='Enter Title'
                  />
                </div>
                <div>
                  <TextField
                    id='content'
                    label='Content'
                    variant='outlined'
                    placeholder='Enter Content'
                    multiline
                    rows={4}
                  />
                </div>
                <div>
                  <Fab
                    variant='extended'
                    size='medium'
                    color='dark'
                    aria-label='add'
                  >
                    Create
                  </Fab>
                </div>
              </form>
            </div>
          </div>
          <div className='col col-md-6 col-sm-12 col-12'>
            {" "}
            <div className='blog-container'>
              <h1 className='blog-title'>Add a News & Media Garelly</h1>
              <form
                className={`d-block bordered ${classes.root}`}
                noValidate
                autoComplete='off'
              >
                <div>
                  <TextField
                    id='title'
                    label='Title'
                    variant='outlined'
                    placeholder='Enter Title'
                  />
                </div>
                <div>
                  <TextField
                    id='content'
                    label='Content'
                    variant='outlined'
                    placeholder='Enter Content'
                    multiline
                    rows={4}
                  />
                </div>
                <div>
                  <Fab
                    variant='extended'
                    size='medium'
                    color='dark'
                    aria-label='add'
                  >
                    Create
                  </Fab>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
