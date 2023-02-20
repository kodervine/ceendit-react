export const USER_INITIAL_STATE = {
  currentUser: "",
  loading: false,
  userUpdated: false,
  setUsertoLocalStorage: () => {},
};

export const authUserReducer = (state, action) => {
  if (action.type === "USER_LOADING") {
    return {
      loading: true,
      currentUser: "",
      userUpdated: false,
      setUsertoLocalStorage: () => {},
    };
  } else if (action.type === "USER_LOGGED_IN") {
    return {
      loading: false,
      currentUser: action.payload,
      userUpdated: true,
      setUserToLocalStorage: localStorage.setItem("isUserSignedIn", true),
    };
  } else if (action.type === "USER_LOGGED_OUT") {
    return {
      loading: false,
      currentUser: action.payload,
      userUpdated: false,
      setUserToLocalStorage: localStorage.removeItem("isUserSignedIn"),
    };
  }
};
