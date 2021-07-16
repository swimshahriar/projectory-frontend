import axios from "axios";

// add service
export const addService = (data, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_SERVICES",
  });

  try {
    await axios.post(
      "http://localhost:8000/api/service",
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: "RESET",
    });
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};
