import axios from "axios";

// fetch jobs
export const fetchJobs = (data) => async (dispatch) => {
  dispatch({
    type: "LOADING_JOBS",
  });

  let fetchUrl;

  if (data?.jid) {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/jobs?jid=${data.jid}`;
  } else if (data?.uid) {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/jobs?uid=${data.uid}`;
  } else {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/jobs`;
  }

  try {
    const res = await axios.get(fetchUrl);

    dispatch({
      type: "FETCH_JOBS",
      payload: {
        jobs: res.data.jobs,
      },
    });
  } catch (error) {
    dispatch({
      type: "ERROR_JOBS",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

// create job
export const createJob = (data, token) => async (dispatch) => {
  dispatch({
    type: "RESET_JOBS",
  });
  dispatch({
    type: "LOADING_JOBS",
  });
  const fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/jobs`;

  try {
    const res = await axios.post(fetchUrl, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "FETCH_JOBS",
      payload: {
        jobs: res.data.jobs,
      },
    });
  } catch (error) {
    dispatch({
      type: "ERROR_JOBS",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

// update job
export const updateJob = (jid, data, token) => async (dispatch) => {
  dispatch({
    type: "RESET_JOBS",
  });
  dispatch({
    type: "LOADING_JOBS",
  });
  const fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/jobs/${jid}`;

  try {
    const res = await axios.patch(fetchUrl, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "FETCH_JOBS",
      payload: {
        jobs: res.data.jobs,
      },
    });
  } catch (error) {
    dispatch({
      type: "ERROR_JOBS",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

// delete job
export const deleteJob = (jid, token) => async (dispatch) => {
  dispatch({
    type: "RESET_JOBS",
  });
  dispatch({
    type: "LOADING_JOBS",
  });
  const fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/jobs/${jid}`;

  try {
    await axios.delete(fetchUrl, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "RESPONSE_JOBS",
    });
  } catch (error) {
    dispatch({
      type: "ERROR_JOBS",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};
