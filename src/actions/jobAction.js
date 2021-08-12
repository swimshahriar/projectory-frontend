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
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/jobs?uid=${uid}`;
  } else {
    fetchUrl = `${import.meta.env.VITE_API_BASE_URI}/jobs`;
  }

  const res = await axios.get(fetchUrl);

  dispatch({
    type: "FETCH_JOBS",
    payload: {
      jobs: res.data.jobs,
    },
  });
};

// update jobs
export const updateJob = (data) => async (dispatch) => {};

// delete jobs
export const deleteJob = (data) => async (dispatch) => {};
