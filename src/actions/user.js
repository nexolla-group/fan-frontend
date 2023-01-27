export const SET_FULL_NAME = "SET_FULL_NAME";
export const SET_USERNAME = "SET_USERNAME";
export const SET_EMAIL = "SET_EMAIL";
export const SET_PROFILE_PICTURE = "SET_PROFILE_PICTURE";
export const SET_COVER_PICTURE = "SET_COVER_PICTURE";
export const SET_FOLLOWERS = "SET_FOLLOWERS";
export const SET_FOLLOWING = "SET_FOLLOWING";
export const SET_JOINED_GROUPS = "SET_JOINED_GROUPS";
export const SET_ROLE = "SET_ROLE";
export const SET_TOKEN = "SET_TOKEN";
export const SET_USER_ID = "SET_USER_ID";
export const RESET_USER = "RESET_USER";

export const setFullNames = (names) => (dispatch) => {
  dispatch({
    type: SET_FULL_NAME,
    payload: names,
  });
};

export const setUsername = (username) => (dispatch) => {
  dispatch({
    type: SET_USERNAME,
    payload: username,
  });
};
export const setToken = (token) => (dispatch) => {
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
};
export const setUserId = (id) => (dispatch) => {
  dispatch({
    type: SET_USER_ID,
    payload: id,
  });
};

export const setEmail = (email) => (dispatch) => {
  dispatch({
    type: SET_EMAIL,
    payload: email,
  });
};

export const setProfilePicture = (picture) => (dispatch) => {
  dispatch({
    type: SET_PROFILE_PICTURE,
    payload: picture,
  });
};

export const setCoverPicture = (picture) => (dispatch) => {
  dispatch({
    type: SET_COVER_PICTURE,
    payload: picture,
  });
};

export const setFollowers = (followers) => (dispatch) => {
  dispatch({
    type: SET_FOLLOWERS,
    payload: followers,
  });
};

export const setFollowing = (following) => (dispatch) => {
  dispatch({
    type: SET_FOLLOWING,
    payload: following,
  });
};

export const setJoinedGroups = (groupsArray) => (dispatch) => {
  dispatch({
    type: SET_JOINED_GROUPS,
    payload: groupsArray,
  });
};

export const setRole = (role) => (dispatch) => {
  dispatch({
    type: SET_ROLE,
    payload: role,
  });
};

export const resetUser = () => ({ type: RESET_USER });
