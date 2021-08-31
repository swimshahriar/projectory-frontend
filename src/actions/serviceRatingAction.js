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
  } else if (data?.oid) {
    reqUrl = `${import.meta.env.VITE_API_BASE_URI}/rating-review?oid=${data.oid}`;
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
export const addRatings = (sid, data, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_RATINGS",
  });

  const reqUrl = `${import.meta.env.VITE_API_BASE_URI}/rating-review/${sid}`;

  try {
    const ratings = await axios.post(reqUrl, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "GIVE_RATINGS",
      payload: ratings.data.ratings,
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

// delete ratings
export const deleteRatings = (data) => async (dispatch) => {
  dispatch({
    type: "LOADING_RATINGS",
  });
};
