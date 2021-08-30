const initialState = {
  isLoading: false,
  res: false,
  error: null,
  orders: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_ORDER":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "FETCH_ORDER":
      return {
        ...state,
        isLoading: false,
        error: null,
        res: true,
        orders: action.payload.orders,
      };

    case "RESPONSE_ORDER":
      return {
        ...state,
        isLoading: false,
        error: null,
        res: true,
      };

    case "ERROR_ORDER":
      return {
        ...state,
        isLoading: false,
        res: false,
        error: action.payload.error,
      };

    case "RESET_ORDER":
      return {
        isLoading: false,
        res: false,
        error: null,
        orders: null,
      };

    default:
      return state;
  }
};

// exports
export default orderReducer;
