import { Box, Button, Chip, Container, Divider, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// internal imports
import { fetchJobs } from "../actions/jobAction";
import AvatarWithUserName from "../components/AvatarWithUserName";
import Loading from "../components/Loading";

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

  // fetch job details
  useEffect(() => {
    (async () => {
      await dispatch(fetchJobs({ jid }));
    })();
  }, [jid, dispatch]);

  if (isLoading || !jobs || !jobs?.length > 0) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg">
      {/* 
        - avatar with username
        - skills
        - price -> apply button + num of applicants
        - details
       */}
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
                ({jobs[0]?.numOfApp || 0} applicants)
              </Typography>
              <Button variant="contained" color="primary" size="large">
                Apply
              </Button>
            </Box>
          )}

          <Divider />
          <Box my={3}>
            <Typography variant="h6" gutterBottom>
              Details
            </Typography>
            <Typography variant="body1" gutterBottom>
              {jobs[0].details}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default JobDetails;
