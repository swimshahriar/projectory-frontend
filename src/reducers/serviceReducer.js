const initialState = {
  isLoading: false,
  error: null,
  services: null,
  res: false,
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_SERVICES":
      return { ...state, isLoading: true, error: null, res: false };

    case "FETCH_SERVICES":
      return {
        ...state,
        isLoading: false,
        error: null,
        services: action.payload.services,
      };

    case "RESPONSE_SERVICES":
      return {
        ...state,
        isLoading: false,
        error: null,
        res: true,
      };

    case "RESET_SERVICES":
      return {
        ...state,
        isLoading: false,
        services: null,
        error: null,
        res: false,
      };

    case "ERROR_SERVICES":
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

export default serviceReducer;
