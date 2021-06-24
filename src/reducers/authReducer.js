const initialState = {
  uid: null,
  token: null,
  expiresAt: null,
  isLoading: false,
  isAuthCheck: true,
  error: null,
  res: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "STOP_LOADING":
      return {
        ...state,
        isLoading: false,
        isAuthCheck: false,
      };

    case "LOGIN":
      return {
        ...state,
        uid: action.payload.uid,
        token: action.payload.token,
        expiresAt: action.payload.expiresAt,
        isLoading: false,
        isAuthCheck: false,
        res: null,
      };

    case "REGISTER":
      return {
        ...state,
        uid: action.payload.uid,
        token: action.payload.token,
        expiresAt: action.payload.expiresAt,
        isLoading: false,
        res: null,
      };

    case "LOGOUT":
      return {
        ...state,
        uid: null,
        token: null,
        expiresAt: null,
        isLoading: false,
        res: null,
      };

    case "ERROR":
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
        res: null,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
        res: null,
      };

    case "FORGOT_PASSWORD":
      return {
        ...state,
        isLoading: false,
        res: action.payload.res,
      };

    case "CLEAR_RES":
      return {
        ...state,
        res: null,
      };

    default:
      return { ...state };
  }
};

export default authReducer;
