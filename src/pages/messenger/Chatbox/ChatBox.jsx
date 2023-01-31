import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./chatBox.css";
import { useSelector } from "react-redux";
import { handleAuthError } from "../../../helpers";

const ChatBox = ({ selectedGroup }) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoading, messages } = useSelector((state) => state.messages);
  const { token, role, username } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      setIsSubmitting(true);

      axios
        .post(process.env.REACT_APP_BACKEND_URL + "/api/messages/", {
          token,
          message,
          groupId: selectedGroup.groupId,
        })
        .then((res) => {
          setIsSubmitting(false);
          setMessage("");
        })
        .catch((error) => {
          setIsSubmitting(false);
          handleAuthError(error);
        });
    }
  };
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <div className='chatbox'>
        {selectedGroup?.groupId ? (
          <>
            <div className='chatbox-messages'>
              {messages
                .find((item) => item.groupId == selectedGroup.groupId)
                ?.messages.map((item, index) => (
                  <div
                    key={index}
                    className={
                      username === item.senderDetails.username
                        ? "chatbox-message own"
                        : "chatbox-message combine"
                    }
                  >
                    <div className='Fan'>
                      @
                      {username !== item.senderDetails.username
                        ? item.senderDetails.username
                        : "You"}
                      <span className='range admin'>
                        {`[${item.senderDetails.role}]`}
                      </span>
                    </div>
                    {item.message}
                    <time className='msgDate'>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
              <div className='message-input'>
                <input
                  disabled={isSubmitting}
                  type='text'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder='Say something'
                  className='input form-control'
                />
                <button type='submit' className='btn btn-success'>
                  {isSubmitting ? "Wait..." : "Send"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className='container-fluid'>
              <div class='alert alert-warning p-4' role='alert'>
                <h3> You haven't Clicked to any group yet!</h3>
                <p>
                  On The group list Click on the group name you have joined to,
                  inorder to open it. or Just look at the top Navigation bar,
                  click on Groups and join group to start chatting.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatBox;
