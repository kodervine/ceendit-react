import {
  USER_LOADING,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
} from "@/reducers/constants";

export const USER_INITIAL_STATE = {
  currentUser: "",
  loading: false,
  userUpdated: false,
  setUsertoLocalStorage: () => {},
};

export const authUserReducer = (_, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        loading: true,
        currentUser: "",
        userUpdated: false,
        setUsertoLocalStorage: () => {},
      };
    case USER_LOGGED_IN:
      return {
        loading: false,
        currentUser: action.payload,
        userUpdated: true,
        setUserToLocalStorage: localStorage.setItem("isUserSignedIn", true),
      };
    case USER_LOGGED_OUT:
      return {
        loading: false,
        currentUser: action.payload,
        userUpdated: false,
        setUserToLocalStorage: localStorage.removeItem("isUserSignedIn"),
      };
  }
};
