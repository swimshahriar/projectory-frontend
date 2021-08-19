// ----------------- fetch skill tests -----------------
export const fetchSkillTests = (data, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_SKILLTEST",
  });
};

// ------------------ fetch test results --------------------
export const fetchSkillTestResults = (data, token) => async (dispatch) => {
  dispatch({ type: "LOADING_SKILLTEST" });
};

// ---------------------- give skill test ---------------------
export const giveSkillTest = (data, token) => async (dispatch) => {
  dispatch({ type: "LOADING_SKILLTEST" });
};
