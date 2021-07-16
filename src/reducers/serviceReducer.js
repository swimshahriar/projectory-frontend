const initialState = {
  isLoading: false,
  error: null,
  services: null,
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_SERVICES":
      return { ...state, isLoading: true, error: null };

    case "FETCH_SERVICES":
      return {
        ...state,
        isLoading: false,
        error: null,
        services: action.payload.services,
      };

    case "RESET":
      return { ...state, isLoading: false, services: null, error: null };

    case "ERROR":
      return { ...state, isLoading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default serviceReducer;
