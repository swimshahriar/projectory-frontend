import axios from "axios";

// fetch user info
export const fetchUserInfo = (uid) => async (dispatch) => {
  dispatch({
    type: "LOADING_USER",
  });

  try {
    const userInfo = await axios.get(`http://localhost:8000/api/user/${uid}`);
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
      "http://localhost:8000/api/user/",
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