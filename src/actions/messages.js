import axios from "axios";
import { handleAuthError } from "../helpers";

export const SET_IS_LOADING_GROUP_MESSAGES = "SET_IS_LOADING_GROUP_MESSAGES";
export const SET_ALL_GROUP_MESSAGES = "SET_ALL_GROUP_MESSAGES";
export const UPDATE_GROUP_MESSAGES = "UPDATE_GROUP_MESSAGES";
export const RESET_GROUP_MESSAGES = "RESET_GROUP_MESSAGES";

export const setIsLoadingGroupMessages = (trueOrFalse) => (dispatch) => {
  dispatch({
    type: SET_IS_LOADING_GROUP_MESSAGES,
    payload: trueOrFalse,
  });
};

export const setAllGroupMessages = (messages) => (dispatch) => {
  dispatch({
    type: SET_ALL_GROUP_MESSAGES,
    payload: messages,
  });
};

export const updateGroupMessages = (messages) => (dispatch) => {
  dispatch({
    type: UPDATE_GROUP_MESSAGES,
    payload: messages,
  });
};

export const resetMessages = () => ({ type: RESET_GROUP_MESSAGES });

export const fetchAllGroupsMessages = () => (dispatch, getState) => {
  const { user } = getState();
  dispatch(setIsLoadingGroupMessages(true));
  axios
    .get(
      process.env.REACT_APP_BACKEND_URL + "/api/messages/?token=" + user.token
    )
    .then((res) => {
      dispatch(setIsLoadingGroupMessages(false));
      dispatch(setAllGroupMessages(res.data.messages));
    })
    .catch((error) => {
      dispatch(setIsLoadingGroupMessages(false));
      handleAuthError(error);
    });
};
