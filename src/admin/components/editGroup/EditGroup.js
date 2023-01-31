import { Modal } from "@mui/material";
import React from "react";

export default function EditGroup() {
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
            Add group
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
                onChange={(e) => setTarget(e.target.value)}
                value={target}
              />
            </FormControl>
            <Button
              variant='contained'
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
