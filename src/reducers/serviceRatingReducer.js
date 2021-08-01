const initialState = {
  isLoading: false,
  error: null,
  ratings: null,
};

const serviceRatingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_RATINGS":
      return { ...state, isLoading: true, error: null };

    case "FETCH_RATINGS":
      return { ...state, isLoading: false, error: null, ratings: action.payload.ratings };

    case "ERROR_RATINGS":
      return { ...state, isLoading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default serviceRatingReducer;
