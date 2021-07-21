import axios from "axios";

// add service
export const addService = (data, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_SERVICES",
  });

  try {
    await axios.post(
      "http://localhost:8000/api/services",
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
      type: "RESPONSE_SERVICES",
    });
  } catch (error) {
    dispatch({
      type: "ERROR_SERVICES",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

// fetch services
export const fetchServices = (data) => async (dispatch) => {
  dispatch({
    type: "LOADING_SERVICES",
  });

  let reqUrl = "http://localhost:8000/api/services";
  if (data?.uid) {
    reqUrl = `http://localhost:8000/api/services?sid=${data.uid}`;
  } else if (data?.sid) {
    reqUrl = `http://localhost:8000/api/services?sid=${data.sid}`;
  }

  try {
    const services = await axios.get(reqUrl);

    dispatch({
      type: "FETCH_SERVICES",
      payload: services.data,
    });
  } catch (error) {
    dispatch({
      type: "ERROR_SERVICES",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

// delete service
export const deleteService = (sid, token, uid) => async (dispatch) => {
  dispatch({
    type: "LOADING_SERVICES",
  });

  try {
    await axios.delete(`http://localhost:8000/api/services/${sid}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "RESET_SERVICES",
    });

    await dispatch(fetchServices({ uid }));
  } catch (error) {
    dispatch({
      type: "ERROR_SERVICES",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};
