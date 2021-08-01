import axios from "axios";

// fetch ratings
export const fetchRatings = (data) => async (dispatch) => {
  dispatch({
    type: "LOADING_RATINGS",
  });

  let reqUrl;
  if (data?.rid) {
    reqUrl = `${import.meta.env.VITE_API_BASE_URI}/rating-review?rid=${data.rid}`;
  } else if (data?.sid) {
    reqUrl = `${import.meta.env.VITE_API_BASE_URI}/rating-review?sid=${data.sid}`;
  }

  try {
    const ratings = await axios.get(reqUrl);

    dispatch({
      type: "FETCH_RATINGS",
      payload: ratings.data,
    });
  } catch (error) {
    dispatch({
      type: "ERROR_RATINGS",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

// add ratings
export const addRatings = (data) => async (dispatch) => {
  dispatch({
    type: "LOADING_RATINGS",
  });
};

// delete ratings
export const deleteRatings = (data) => async (dispatch) => {
  dispatch({
    type: "LOADING_RATINGS",
  });
};
