const initialState = {
  isLoading: false,
  error: null,
  payments: null,
  updateRes: false,
  res: false,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_PAYMENTS":
      return { ...state, isLoading: true, error: null, res: false, updateRes: false };

    case "FETCH_PAYMENTS":
      return {
        ...state,
        isLoading: false,
        error: null,
        payments: action.payload.payments,
        res: true,
      };

    case "RESPONSE_PAYMENTS":
      return {
        ...state,
        isLoading: false,
        error: null,
        res: true,
      };

    case "UPDATE_PAYMENTS":
      return {
        ...state,
        isLoading: false,
        error: null,
        res: false,
        updateRes: true,
      };

    case "RESET_PAYMENTS":
      return {
        ...state,
        isLoading: false,
        jobs: null,
        error: null,
        updateRes: false,
        res: false,
      };

    case "ERROR_PAYMENTS":
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        updateRes: false,
        res: false,
      };

    default:
      return state;
  }
};

export default paymentReducer;
