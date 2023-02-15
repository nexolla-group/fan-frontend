import { Box, Modal } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toastMessage } from "../../../helpers";
import ChatBox from "../../../pages/messenger/Chatbox/ChatBox";
import InfoBar from "../../../pages/messenger/infobar/InfoBar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 950,
  height: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function GroupChat({
  openChat,
  setOpenChat,
  selectedGroup,
  fetchGroups,
}) {
  const [groupName, setGroupName] = useState(selectedGroup.groupName);
  const [description, setDescription] = useState(selectedGroup.description);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpenChat(false);
  const handleEdit = () => {
    setLoading(true);
    axios
      .put(
        process.env.REACT_APP_BACKEND_URL + "/api/groups/" + selectedGroup._id,
        {
          groupName,
          description,
        }
      )
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
    setGroupName(selectedGroup.groupName);
    setDescription(selectedGroup.description);
  }, [selectedGroup]);

  return (
    <div>
      <Modal
        open={openChat}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div
            className='msgcontainer'
            style={{ width: "100%", height: "100%" }}
          >
            {selectedGroup.groupId && <InfoBar selectedGroup={selectedGroup} />}
            <ChatBox selectedGroup={selectedGroup} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
