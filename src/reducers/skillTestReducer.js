const initialState = {
  isLoading: false,
  skillTests: null,
  testResults: null,
  res: false,
  error: null,
};

const skillTestReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_SKILLTEST":
      return {
        ...state,
        isLoading: true,
      };

    case "FETCH_SKILLTEST":
      return {
        ...state,
        isLoading: false,
        res: true,
        error: null,
        skillTests: action.payload.skillTests,
      };

    case "FETCH_RESULT_SKILLTEST":
      return {
        ...state,
        isLoading: false,
        res: true,
        error: null,
        testResults: action.payload.testResults,
      };

    case "RESPONSE_SKILLTEST":
      return {
        ...state,
        isLoading: false,
        error: null,
        res: true,
      };

    case "ERROR_SKILLTEST":
      return {
        ...state,
        isLoading: false,
        res: false,
        error: action.payload.error,
      };

    case "RESET_SKILLTEST":
      return {
        isLoading: false,
        skillTests: null,
        res: false,
        error: null,
      };

    default:
      return state;
  }
};

// export
export default skillTestReducer;
