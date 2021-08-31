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
      type: "CREATE_ORDER",
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

  let fetchUrl;

  if (data?.reqUid) {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/orders?reqUid=${data.reqUid}&type=${
      data?.type
    }`;
  } else if (data?.recUid) {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/orders?recUid=${data.recUid}&type=${
      data?.type
    }`;
  } else if (data?.oid) {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/orders?oid=${data.oid}`;
  } else {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/orders?type=${data?.type}`;
  }

  try {
    const res = await axios.get(fetchUrl, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "FETCH_ORDER",
      payload: {
        orders: res.data.orders,
      },
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

// ----------------- update orders --------------
export const updateOrder = (oid, data, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_ORDER",
  });

  const fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/orders/${oid}`;

  try {
    const res = await axios.patch(
      fetchUrl,
      { ...data },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: "UPDATE_ORDER",
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

// ----------------- finished orders --------------
export const finishedOrder = (oid, data, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_ORDER",
  });

  const fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/orders/finished/${oid}`;

  try {
    const res = await axios.patch(
      fetchUrl,
      { ...data },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: "FINISH_ORDER",
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
