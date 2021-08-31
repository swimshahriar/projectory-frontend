const initialState = {
  isLoading: false,
  res: false,
  createRes: false,
  finishedRes: false,
  updatedRes: false,
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
        finishedRes: false,
        createRes: false,
        orders: action.payload.orders,
      };

    case "RESPONSE_ORDER":
      return {
        ...state,
        isLoading: false,
        error: null,
        res: true,
        finishedRes: false,
      };

    case "CREATE_ORDER":
      return {
        ...state,
        isLoading: false,
        error: null,
        res: false,
        createRes: true,
        finishedRes: false,
      };

    case "FINISH_ORDER":
      return {
        ...state,
        isLoading: false,
        error: null,
        res: false,
        createRes: false,
        finishedRes: true,
      };

    case "UPDATE_ORDER":
      return {
        ...state,
        isLoading: false,
        error: null,
        res: false,
        createRes: false,
        finishedRes: false,
        updatedRes: true,
      };

    case "ERROR_ORDER":
      return {
        ...state,
        isLoading: false,
        res: false,
        createRes: false,
        finishedRes: false,
        error: action.payload.error,
      };

    case "RESET_ORDER":
      return {
        isLoading: false,
        res: false,
        createRes: false,
        error: null,
        orders: null,
        finishedRes: false,
      };

    default:
      return state;
  }
};

// exports
export default orderReducer;
