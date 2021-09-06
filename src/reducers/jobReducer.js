const initialState = {
  isLoading: false,
  error: null,
  jobs: null,
  res: false,
  addRes: false,
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_JOBS":
      return { ...state, isLoading: true, error: null, res: false, addRes: false };

    case "STOP_LOADING_JOBS":
      return { ...state, isLoading: false };

    case "FETCH_JOBS":
      return {
        ...state,
        isLoading: false,
        error: null,
        jobs: action.payload.jobs,
        res: true,
      };

    case "RESPONSE_JOBS":
      return {
        ...state,
        isLoading: false,
        error: null,
        res: true,
      };
    case "ADD_JOBS":
      return {
        ...state,
        isLoading: false,
        error: null,
        addRes: true,
      };

    case "RESET_JOBS":
      return {
        ...state,
        isLoading: false,
        jobs: null,
        error: null,
        res: false,
        addRes: false,
      };

    case "ERROR_JOBS":
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        res: false,
      };

    default:
      return state;
  }
};

export default jobReducer;
