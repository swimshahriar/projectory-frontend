import axios from "axios";

// add service
export const addService = (data, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_SERVICES",
  });

  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URI}/services`,
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

  let reqUrl = `${import.meta.env.VITE_API_BASE_URI}/services`;
  if (data?.uid) {
    reqUrl = `${import.meta.env.VITE_API_BASE_URI}/services?uid=${data.uid}`;
  } else if (data?.sid) {
    reqUrl = `${import.meta.env.VITE_API_BASE_URI}/services?sid=${data.sid}`;
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

// get fav services
export const fetchFavoriteServices = (token) => async (dispatch) => {
  dispatch({
    type: "LOADING_SERVICES",
  });
  try {
    const services = await axios.get(`${import.meta.env.VITE_API_BASE_URI}/services/favorites`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "FETCH_FAV_SERVICES",
      payload: {
        services: services.data.services,
      },
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

// save a service to fav
export const makeFavoriteService = (sid, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_SERVICES",
  });

  try {
    const services = await axios.post(
      `${import.meta.env.VITE_API_BASE_URI}/services/favorites/${sid}`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: "FETCH_FAV_SERVICES",
      payload: {
        services: services.data.services,
      },
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

// update service
export const updateService = (data, sid, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_SERVICES",
  });

  try {
    await axios.patch(
      `${import.meta.env.VITE_API_BASE_URI}/services/${sid}`,
      {
        ...data,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    await dispatch({ type: "RESPONSE_SERVICES" });
    await dispatch(fetchServices({ sid }));
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
    await axios.delete(`${import.meta.env.VITE_API_BASE_URI}/services/${sid}`, {
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
