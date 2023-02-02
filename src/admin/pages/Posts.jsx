import React, { useState } from "react";
import AdminNavbar from "../components/adminNavbar/AdminNavbar";
import Sidebar from "../components/sidebar/Sidebar";
import "./posts.css";

import Fab from "@mui/material/Fab";
import { Box, TableContainer, TextField } from "@mui/material";
import { makeStyles, Paper } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";
import { errorHandler, toastMessage } from "../../helpers";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";
import { useEffect } from "react";
import { Delete, Edit } from "@mui/icons-material";
import EditPost from "../components/editPost/EditPost";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));
const Posts = () => {
  const { token } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postingBlog, setPostingBlog] = useState(false);
  const [animation, setAnimation] = useState("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const [postToEdit, setPostToEdit] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handlePost = (e) => {
    e.preventDefault();
    setPostingBlog(true);
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/post", {
        title,
        desc: content,
        token,
      })
      .then((res) => {
        setTitle("");
        setContent("");
        toastMessage("success", res.data.message);
        fetchPost();
        setPostingBlog(false);
      })
      .catch((error) => {
        errorHandler(error);
        setPostingBlog(false);
      });
  };

  const [fetchedPost, setFetchedPost] = useState([]);
  const fetchPost = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/post")
      .then((res) => {
        setFetchedPost(res.data.data);
      })
      .catch((error) => console.log("Bad", error));
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const classes = useStyles();

  const columns = useMemo(
    () => [
      { field: "title", headerName: "Title", width: 150 },
      { field: "desc", headerName: "Content", width: 200 },
      { field: "userId", headerName: "user", width: 200 },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 100,
        renderCell: (item) => {
          return new Date(item.row.createdAt).toLocaleDateString();
        },
      },
      {
        field: "action",
        headerName: "Action",
        width: 80,
        renderCell: (item) => (
          <>
            <Edit
              onClick={() => {
                handleOpenEdit();
                setPostToEdit(item.row);
              }}
            />
            <Delete onClick={() => handleDelete(item.row._id)} />
          </>
        ),
      },
    ],
    []
  );
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(
        process.env.REACT_APP_BACKEND_URL +
          "/api/post/" +
          id +
          "/?token=" +
          token
      )
      .then((res) => {
        fetchPost();
        toastMessage("success", res.data.message);
      })
      .catch((error) => console.log(error));
  };
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div>
                  <Fab
                    variant='extended'
                    size='medium'
                    color='dark'
                    aria-label='add'
                    onClick={handlePost}
                  >
                    {postingBlog ? "Creating..." : "Create"}
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
                    onClick={handleSubmit}
                  >
                    Create
                  </Fab>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col col-md-8 col-sm-12 col-12 m-2'>
            <h2 style={{ fontWeight: "700", marginLeft: "70px" }}>Blog Post</h2>
            <TableContainer component={Paper} className={`table ${animation}`}>
              <Box sx={{ width: "100%" }}>
                <div style={{ height: 300, width: "100%" }}>
                  <DataGrid
                    rows={fetchedPost}
                    columns={columns}
                    getRowId={(row) => row._id}
                  />
                </div>
              </Box>
            </TableContainer>
            <EditPost
              open={openEdit}
              setOpen={setOpenEdit}
              post={postToEdit}
              fetchPost={fetchPost}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
