import {
  SET_IS_LOADING_GROUP_MESSAGES,
  UPDATE_GROUP_MESSAGES,
  SET_ALL_GROUP_MESSAGES,
  RESET_GROUP_MESSAGES,
} from "../actions/messages";

const initialState = {
  isLoading: false,
  messages: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING_GROUP_MESSAGES:
      return { ...state, isLoading: action.payload };
    case SET_ALL_GROUP_MESSAGES:
      return { ...state, messages: action.payload };
    case UPDATE_GROUP_MESSAGES: {
      let newState = state.messages;
      const exists = newState.findIndex(
        (item) => item.groupId == action.payload.groupId
      );
      if (exists >= 0) {
        newState[exists] = action.payload;
        return { ...state, messages: newState };
      } else {
        newState.push(action.payload);
        return { ...state, messages: newState };
      }
    }
    case RESET_GROUP_MESSAGES:
      return initialState;
    default:
      return state;
  }
};

export default user;
