import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// internal imports
import { fetchJobs } from "../../actions/jobAction";
import { createOrder } from "../../actions/orderAction";
import AvatarWithUserName from "../../components/AvatarWithUserName";
import DialogModal from "../../components/DialogModal";
import SiteLayout from "../../components/layouts/SiteLayout";
import Loading from "../../components/Loading";
import SweetAlert from "../../components/SweetAlert";

// styles
const useStyles = makeStyles(() => ({
  hover: {
    cursor: "pointer",
  },
}));

const JobDetails = () => {
  const classes = useStyles();
  const { jid } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { jobs, isLoading } = useSelector((state) => state.jobs);
  const { uid, token } = useSelector((state) => state.auth);
  const { isLoading: orderLoading, createRes } = useSelector((state) => state.orders);
  const [open, setOpen] = useState(false);
  const [brief, setBrief] = useState("");

  // fetch job details
  useEffect(() => {
    (async () => {
      await dispatch(fetchJobs({ jid }));
    })();
    return () => {
      dispatch({
        type: "RESET_JOBS",
      });
    };
  }, [jid, dispatch]);

  // ----------------------- handle submit ------------------
  const handleSubmit = async () => {
    if (brief !== "") {
      const finalData = {
        type: "jobs",
        recPersonId: jobs[0]?.userId,
        recPersonUserName: jobs[0]?.userName,
        title: jobs[0]?.title,
        price: jobs[0]?.price,
        jobId: jobs[0]?._id,
        duration: jobs[0]?.duration,
        features: jobs[0]?.skills,
        brief,
      };

      await dispatch(createOrder(finalData, token));
    }
  };

  // -------------------- if apply success ------------------
  useEffect(() => {
    if (createRes) {
      SweetAlert.fire({
        icon: "success",
        title: "Success",
        timer: 2000,
        timerProgressBar: true,
        position: "bottom-right",
        toast: true,
        showConfirmButton: false,
      });

      setBrief("");
      setOpen(false);
      history.push("/orders/seller-jobs");
    }

    return () => dispatch({ type: "RESET_ORDER" });
  }, [dispatch, createRes, history]);

  if (isLoading || !jobs || !jobs?.length > 0) {
    return <Loading />;
  }

  return (
    <SiteLayout>
      {/* ------------------------ Apply modal ------------------------ */}
      <DialogModal
        open={open}
        setOpen={setOpen}
        title="Apply request"
        bodyText={
          <Box my={2}>
            <Typography variant="body1" color="textSecondary">
              {jobs[0]?.title} - {jobs[0]?.price}tk
            </Typography>
          </Box>
        }
        body={
          <Box my={2}>
            <TextField
              label="your Brief"
              variant="outlined"
              required
              multiline
              rows={7}
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
            />
          </Box>
        }
        actions={
          <Box my={2}>
            {!orderLoading ? (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Apply
              </Button>
            ) : (
              <CircularProgress color="primary" />
            )}
          </Box>
        }
      />

      {/* --------------------------- job details --------------------------- */}
      <Container maxWidth="lg">
        <Paper>
          <Box px={3} py={4} my={3}>
            <Typography variant="h5" gutterBottom>
              {jobs[0].title}
            </Typography>

            <Box
              my={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box
                onClick={() => history.push(`/user-profile/${jobs[0].userId}`)}
                className={classes.hover}
              >
                <AvatarWithUserName
                  publicId={jobs[0].userImg}
                  uploadPreset="projectory/avatar"
                  userName={jobs[0].userName}
                  width="30"
                  height="30"
                  radius="50"
                  crop="fill"
                />
              </Box>
              <Chip label={new Date(jobs[0].createdAt).toDateString()} />
            </Box>

            <Box display="flex" flexWrap="wrap" gridGap={10}>
              <Chip label={jobs[0].category} color="secondary" />
              <Chip label={jobs[0].status} color="primary" />
              <Chip label={`${jobs[0].duration} days`} color="secondary" />
            </Box>

            <Box
              my={3}
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              flexWrap="wrap"
              gridGap={10}
            >
              <Chip label="skills" />
              {jobs[0]?.skills &&
                jobs[0].skills.map((skill, idx) => (
                  <Chip
                    key={idx}
                    label={skill}
                    variant="outlined"
                    color={idx % 2 === 0 ? "primary" : "secondary"}
                  />
                ))}
            </Box>

            {jobs[0].status === "public" && (
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                flexWrap="wrap"
                gridGap={10}
                mb={3}
              >
                <Typography variant="body1" color="textSecondary">
                  ({jobs[0]?.applicants || 0} applicants)
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={jobs[0]?.userId === uid}
                  onClick={() => {
                    if (token) {
                      setOpen(true);
                    } else {
                      history.push("/auth");
                    }
                  }}
                >
                  Apply
                </Button>
                {jobs[0]?.userId !== uid && (
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => history.push(`/chats?rid=${jobs[0]?.userId}`)}
                    >
                      Contact
                    </Button>
                  </Box>
                )}
              </Box>
            )}

            <Divider />
            <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" gutterBottom>
                Details
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                {jobs[0].price} tk
              </Typography>
            </Box>
            <Typography variant="body1" gutterBottom>
              {jobs[0].details}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </SiteLayout>
  );
};

export default JobDetails;
