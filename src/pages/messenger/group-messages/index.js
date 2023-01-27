import axios from "axios";
import "./groupMessages.css";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { handleAuthError } from "../../../helpers";

import { Send } from "@mui/icons-material";

function GroupMessages({ selectedGroup }) {
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
    <div className="groupMessage">
      {selectedGroup?.groupId ? (
        <>
          <div className="menu"></div>
          <ol className="chat">
            <li className="other">
              {/* messages */}
              {messages
                .find((item) => item.groupId == selectedGroup.groupId)
                ?.messages?.map((item) => (
                  <div className="msg" ref={scrollRef}>
                    <div
                      className={
                        username === item.senderDetails.username
                          ? "own"
                          : "combine"
                      }
                    >
                      <div className="user">
                        @
                        {username !== item.senderDetails.username
                          ? item.senderDetails.username
                          : "You"}
                        <span className="range admin">
                          {`[${item.senderDetails.role}]`}
                        </span>
                      </div>

                      <div className="msgContent">
                        <p>{item.message}</p>
                      </div>
                      <time className="msgDate">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </time>
                    </div>
                  </div>
                ))}
              {/* messages */}
            </li>
          </ol>
          <div className="typezone">
            <form onSubmit={handleSubmit} className="form">
              <textarea
                className="input"
                disabled={isSubmitting}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                type="text"
                maxLength={500}
                placeholder="Say something"
              ></textarea>
              <button type="submit" className="sendButton">
                {isSubmitting ? "Submitting..." : "Send"}
                <Send />
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <h1 className="selectText">
            Choose group to start conversation with others
          </h1>
        </>
      )}
    </div>
  );
}

export default GroupMessages;
