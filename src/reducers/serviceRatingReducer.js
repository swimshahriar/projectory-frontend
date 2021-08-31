const initialState = {
  isLoading: false,
  error: null,
  ratings: null,
  giveRatingRes: false,
};

const serviceRatingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_RATINGS":
      return { ...state, isLoading: true, error: null };

    case "FETCH_RATINGS":
      return { ...state, isLoading: false, error: null, ratings: action.payload.ratings };

    case "GIVE_RATINGS":
      return {
        ...state,
        isLoading: false,
        error: null,
        ratings: action.payload.ratings,
        giveRatingRes: true,
      };
    case "ERROR_RATINGS":
      return { ...state, giveRatingRes: false, isLoading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default serviceRatingReducer;
