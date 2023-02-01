import {
  SET_FULL_NAME,
  SET_USERNAME,
  SET_EMAIL,
  SET_COVER_PICTURE,
  SET_PROFILE_PICTURE,
  SET_FOLLOWERS,
  SET_FOLLOWING,
  SET_JOINED_GROUPS,
  SET_ROLE,
  RESET_USER,
  SET_USER_PHONE,
  SET_USER_GENDER,
  SET_USER_ADDRESS,
  SET_TOKEN,
  SET_USER_ID,
} from "../actions/user";

const initialState = {
  id: "",
  fullName: "",
  username: "",
  email: "",
  phone: "",
  gender: "",
  address:"",
  coverPicture: "",
  profilePicture: "",
  followers: [],
  following: [],
  joinedGroups: [],
  role: "",
  token: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state, id: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_FULL_NAME:
      return { ...state, fullName: action.payload };
    case SET_USERNAME:
      return { ...state, username: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_USER_PHONE:
      return { ...state, phone: action.payload };
    case SET_USER_GENDER:
      return { ...state, gender: action.payload };
    case SET_USER_ADDRESS:
      return { ...state, address: action.payload };
    case SET_COVER_PICTURE:
      return { ...state, coverPicture: action.payload };
    case SET_PROFILE_PICTURE:
      return { ...state, profilePicture: action.payload };
    case SET_FOLLOWERS:
      return { ...state, followers: action.payload };
    case SET_FOLLOWING:
      return { ...state, following: action.payload };
    case SET_JOINED_GROUPS:
      return { ...state, joinedGroups: action.payload };
    case SET_ROLE:
      return { ...state, role: action.payload };
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};

export default user;
