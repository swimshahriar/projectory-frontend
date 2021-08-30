import axios from "axios";

// -------------------- create order ---------------------
export const createOrder = (data, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_ORDER",
  });

  const fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/orders`;

  try {
    await axios.post(
      fetchUrl,
      { ...data },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: "RESPONSE_ORDER",
    });
  } catch (error) {
    dispatch({
      type: "ERROR_ORDER",
      payload: {
        error: error.response?.data?.message || error.message,
      },
    });
  }
};

// ------------------- fetch orders ---------------------
export const fetchOrders = (data, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_ORDER",
  });
};
