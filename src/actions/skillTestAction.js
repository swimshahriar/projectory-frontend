import axios from "axios";

// ----------------- fetch skill tests -----------------
export const fetchSkillTests = (data, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_SKILLTEST",
  });

  let fetchUrl;
  if (data?.tid) {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/skill-test?tid=${data.tid}`;
  } else {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/skill-test`;
  }

  try {
    const res = await axios.get(fetchUrl, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "FETCH_SKILLTEST",
      payload: {
        skillTests: res.data.skillTests,
      },
    });
  } catch (error) {
    dispatch({
      type: "ERROR_SKILLTEST",
      payload: {
        error: error.response?.data?.message || error.message,
      },
    });
  }
};

// ------------------ fetch test results --------------------
export const fetchSkillTestResults = (data, token) => async (dispatch) => {
  dispatch({ type: "LOADING_SKILLTEST" });

  let fetchUrl;
  if (data?.uid) {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/skill-test-result?uid=${data.uid}`;
  } else if (data?.trid) {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/skill-test-result?trid=${data.trid}`;
  } else if (data?.tid) {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/skill-test-result?tid=${data.tid}`;
  } else {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/skill-test-result`;
  }

  try {
    const res = await axios.get(fetchUrl, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "FETCH_RESULT_SKILLTEST",
      payload: {
        testResults: res.data.skillTestResult,
      },
    });
  } catch (error) {
    dispatch({
      type: "ERROR_SKILLTEST",
      payload: {
        error: error.response?.data?.message || error.message,
      },
    });
  }
};

// ---------------------- give skill test ---------------------
export const giveSkillTest = (data, token) => async (dispatch) => {
  dispatch({ type: "LOADING_SKILLTEST" });
};
