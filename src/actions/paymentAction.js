import axios from "axios";

// -------------------- fetch payments ---------------------
export const fetchPayments = (data, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_PAYMENTS",
  });

  let fetchUrl;

  if (data?.pid) {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/payments?pid=${data.pid}`;
  } else if (data?.uid && data?.type) {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/payments?uid=${data.uid}&type=${data?.type}`;
  } else if (data?.type && !data?.uid) {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/payments?type=${data.type}`;
  }

  try {
    const res = await axios.get(fetchUrl, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "FETCH_PAYMENTS",
      payload: {
        payments: res.data.payments,
      },
    });
  } catch (error) {
    dispatch({
      type: "ERROR_PAYMENTS",
      payload: {
        error: error.response?.data?.message || error.message,
      },
    });
  }
};

// -------------------- create payments ---------------------
export const createPayments = (data, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_PAYMENTS",
  });

  const Url = `${import.meta.env.VITE_API_BASE_URI}/payments`;

  try {
    await axios.post(Url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "RESPONSE_PAYMENTS",
    });
  } catch (error) {
    dispatch({
      type: "ERROR_PAYMENTS",
      payload: {
        error: error.response?.data?.message || error.message,
      },
    });
  }
};
