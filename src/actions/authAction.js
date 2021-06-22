import axios from 'axios';

export const loginHandler = (data) => async (dispatch) => {
  dispatch({
    type: "LOADING",
  });

  let loginData; 
  
  try {
    loginData = await axios.post("http://localhost:8000/api/user/login", {...data});
    if (loginData.data.status === "fail") {
      dispatch({
        type: "ERROR",
        payload: {
          error: loginData.data.message,
        }
      });
    } else {
      dispatch({
        type: "REGISTER",
        payload: {
          uid: loginData.data.uid,
          token: loginData.data.token,
          expiresAt: loginData.data.expiresAt
        }
      })
    
      localStorage.setItem("token", loginData.data.token);
    }
  
  } catch(error) {
    dispatch({
      type: "ERROR",
      payload: {
        error: error.message,
      }
    })
  }

}

export const registerHandler = (data) => async (dispatch) => {
  dispatch({
    type: "LOADING",
  });

  let registerData;

  try {
    registerData = await axios.post("http://localhost:8000/api/user/register", {...data});
    
    if (registerData.data.status === "fail") {
      dispatch({
        type: "ERROR",
        payload: {
          error: registerData.data.message,
        }
      });
    } else {
      dispatch({
        type: "REGISTER",
        payload: {
          uid: registerData.data.uid,
          token: registerData.data.token,
          expiresAt: registerData.data.expiresAt
        }
      })
    
      localStorage.setItem("token", registerData.data.token);
    }
  
  } catch(error) {
    dispatch({
      type: "ERROR",
      payload: {
        error: error.message,
      }
    });
  }

}