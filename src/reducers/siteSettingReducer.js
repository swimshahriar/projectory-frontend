const initialState = {
  isLoading: false,
  res: false,
  error: null,
  settings: [],
  language: "eng",
};

const siteSettingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      return {
        ...state,
        language: state.language === "eng" ? "bng" : "eng",
      };

    case "LOADING_SETTINGS":
      return {
        ...state,
        isLoading: true,
        res: false,
        error: null,
      };

    case "FETCH_SETTINGS":
      return {
        ...state,
        isLoading: false,
        res: true,
        error: null,
        settings: action.payload.settings,
      };

    case "ERROR_SETTINGS":
      return {
        ...state,
        isLoading: false,
        res: false,
        error: action.payload.error,
      };

    case "RESET_SETTINGS":
      return {
        isLoading: false,
        res: false,
        error: null,
        settings: [],
      };

    default:
      return state;
  }
};

export default siteSettingReducer;
