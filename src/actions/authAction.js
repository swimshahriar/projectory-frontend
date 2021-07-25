import axios from "axios";
import { fetchFavoriteServices } from "./serviceAction";

// login
export const loginHandler = (data) => async (dispatch) => {
  dispatch({
    type: "LOADING",
  });

  let loginData;

  try {
    loginData = await axios.post("http://localhost:8000/api/user/login", {
      ...data,
    });

    dispatch({
      type: "LOGIN",
      payload: {
        uid: loginData.data.uid,
        token: loginData.data.token,
        expiresAt: loginData.data.expiresAt,
      },
    });

    const localData = {
      uid: loginData.data.uid,
      token: loginData.data.token,
      expiresAt: loginData.data.expiresAt,
    };

    localStorage.setItem("auth", JSON.stringify(localData));
    await dispatch(fetchFavoriteServices(loginData.data.token));
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

// register
export const registerHandler = (data) => async (dispatch) => {
  dispatch({
    type: "LOADING",
  });

  let registerData;

  try {
    registerData = await axios.post("http://localhost:8000/api/user/register", {
      ...data,
    });

    dispatch({
      type: "REGISTER",
      payload: {
        uid: registerData.data.uid,
        token: registerData.data.token,
        expiresAt: registerData.data.expiresAt,
      },
    });

    const localData = {
      uid: registerData.data.uid,
      token: registerData.data.token,
      expiresAt: registerData.data.expiresAt,
    };

    localStorage.setItem("auth", JSON.stringify(localData));
    await dispatch(fetchFavoriteServices(registerData.data.token));
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

// logout
export const logOutHandler = () => async (dispatch) => {
  dispatch({
    type: "LOADING",
  });
  dispatch({
    type: "LOGOUT",
  });

  await localStorage.removeItem("auth");
};

// forgot password
export const forgotPassHandler = (data) => async (dispatch) => {
  dispatch({
    type: "LOADING",
  });
  dispatch({
    type: "CLEAR_RES",
  });

  try {
    const { data: res } = await axios.post("http://localhost:8000/api/user/forgot-password", {
      email: data,
    });

    dispatch({
      type: "FORGOT_PASSWORD",
      payload: {
        res: res.message,
      },
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

// reset password
export const resetPassHandler = (data) => async (dispatch) => {
  dispatch({
    type: "LOADING",
  });
  dispatch({
    type: "CLEAR_RES",
  });

  try {
    const { data: res } = await axios.patch(
      `http://localhost:8000/api/user/reset-password/${data.token}`,
      {
        password: data.password,
        confirmPassword: data.confirmPassword,
      }
    );

    dispatch({
      type: "FORGOT_PASSWORD",
      payload: {
        res: res.message,
      },
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

// on start check for auth
export const checkForAuth = () => async (dispatch) => {
  dispatch({
    type: "LOADING",
  });

  try {
    let authData = await localStorage.getItem("auth");

    authData = await JSON.parse(authData);
    if (!authData) {
      dispatch({
        type: "STOP_LOADING",
      });
    } else {
      const expireTime = authData.expiresAt;
      const timeNow = Date.now() / 1000;

      const isValidToken = expireTime > timeNow;

      if (isValidToken) {
        dispatch({
          type: "LOGIN",
          payload: {
            uid: authData.uid,
            token: authData.token,
            expiresAt: authData.expiresAt,
          },
        });

        await dispatch(fetchFavoriteServices(authData.token));
      } else {
        dispatch({
          type: "LOGOUT",
        });

        localStorage.removeItem("auth");
      }
    }
  } catch (error) {
    console.error(error);
  }
};
