import axios from "axios";

// fetch user info
export const fetchUserInfo = (uid) => async (dispatch) => {
  dispatch({
    type: "LOADING_USER",
  });

  try {
    const userInfo = await axios.get(`${import.meta.env.VITE_API_BASE_URI}/user/${uid}`);
    dispatch({
      type: "FETCH_INFO",
      payload: {
        ...userInfo.data,
      },
    });
  } catch (error) {
    dispatch({
      type: "ERROR_USER",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

// update info
export const updateUserInfo = (data, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_USER",
  });

  try {
    const userInfo = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URI}/user/`,
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
      type: "UPDATE_INFO",
      payload: {
        ...userInfo.data,
      },
    });
  } catch (error) {
    dispatch({
      type: "ERROR_USER",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

// change password
export const changePass = (data, token) => async (dispatch) => {
  dispatch({
    type: "LOADING_USER",
  });

  try {
    await axios.patch(
      `${import.meta.env.VITE_API_BASE_URI}/user/change-password`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await localStorage.removeItem("auth");
    location.replace("/auth");
  } catch (error) {
    dispatch({
      type: "ERROR_USER",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};
