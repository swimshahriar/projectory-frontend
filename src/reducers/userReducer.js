const initialState = {
  user: null,
  isLoading: true,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_USER":
      return { ...state, isLoading: true };

    case "ERROR_USER":
      return { ...state, isLoading: false, error: action.payload.error };

    case "FETCH_INFO":
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload.user,
      };
    default:
      return { ...state };
  }
};

export default userReducer;
