import { Box, Chip, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router-dom";
// internal imports
import AvatarWithUserName from "./AvatarWithUserName";

// styles
const useStyles = makeStyles(() => ({
  jobCard: {
    cursor: "pointer",
  },
}));

const JobCard = ({ job }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box
      minWidth="300px"
      width="100%"
      className={classes.jobCard}
      onClick={() => history.push(`/jobs/${job._id}`)}
    >
      <Paper>
        <Box py={3} px={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <AvatarWithUserName
              publicId={job.userImg}
              uploadPreset="projectory/avatar"
              width={30}
              height={30}
              radius={50}
              crop="fill"
              userName={job.userName}
            />
            <Chip label={new Date(job.createdAt).toDateString()} />
          </Box>
          <Typography variant="h6" gutterBottom>
            {job.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {job.details.slice(0, 100)}
            ...
          </Typography>

          <Box display="flex" justifyContent="flex-start" alignItems="center" gridGap={10} mt={3}>
            <Chip label={job.category} color="secondary" />
            <Chip label={`${job.duration} days`} color="primary" />
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
            <Box display="flex" justifyContent="flex-start" alignItems="center" gridGap={3}>
              {job.skills.map((skill, idx) => (
                <Chip
                  label={skill}
                  key={idx}
                  color={idx % 2 === 0 ? "primary" : "secondary"}
                  variant="outlined"
                />
              ))}
            </Box>
            <Typography variant="h6" color="primary">
              {job.price} Tk
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default JobCard;
