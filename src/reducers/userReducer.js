const initialState = {
  user: null,
  isLoading: true,
  error: null,
  res: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_USER":
      return { ...state, isLoading: true, res: null };

    case "ERROR_USER":
      return { ...state, isLoading: false, error: action.payload.error };

    case "FETCH_INFO":
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload.user,
        res: null,
      };

    case "UPDATE_INFO":
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload.user,
        res: "updated",
      };

    case "CLEAR_INFO":
      return {
        ...state,
        user: null,
        isLoading: false,
        error: null,
        res: null,
      };
    default:
      return { ...state };
  }
};

export default userReducer;
