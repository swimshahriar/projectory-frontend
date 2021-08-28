import axios from "axios";

// ------------------ fetch site settings ------------------
export const fetchSiteSettings = (token) => async (dispatch) => {
  dispatch({
    type: "LOADING_SETTINGS",
  });

  const fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/site-settings`;

  try {
    const res = await axios.get(fetchUrl, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "FETCH_SETTINGS",
      payload: {
        settings: res.data.settings,
      },
    });
  } catch (error) {
    dispatch({
      type: "ERROR_SETTINGS",
      payload: {
        error: error.response?.data?.message || error.message,
      },
    });
  }
};

// --------------------- update site settings -------------------
export const updateSiteSettings = (ssid, data, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_SETTINGS",
  });

  const fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/site-settings/${ssid}`;

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
      type: "FETCH_SETTINGS",
      payload: {
        settings: res.data.settings,
      },
    });
  } catch (error) {
    dispatch({
      type: "ERROR_SETTINGS",
      payload: {
        error: error.response?.data?.message || error.message,
      },
    });
  }
};
