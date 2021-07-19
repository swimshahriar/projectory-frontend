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

  try {
    const services = await axios.get("http://localhost:8000/api/services");

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
