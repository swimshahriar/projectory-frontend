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

const JobCard = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box
      minWidth="300px"
      width="100%"
      className={classes.jobCard}
      onClick={() => history.push("/jobs/1")}
    >
      <Paper>
        <Box py={3} px={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <AvatarWithUserName
              publicId="12"
              uploadPreset="projectory/avatar"
              width={30}
              height={30}
              radius={50}
              crop="fill"
              userName="swimshahriar"
            />
            <Chip label={new Date().toDateString()} />
          </Box>
          <Typography variant="h6" gutterBottom>
            I need a Frontend Web Developer
          </Typography>
          <Typography variant="body1" gutterBottom>
            {`This is my project description. I need a person with react, material ui and firebase knowledge.`.slice(
              0,
              100
            )}
            ...
          </Typography>

          <Box display="flex" justifyContent="flex-start" alignItems="center" gridGap={10} mt={3}>
            <Chip label="web-development" color="secondary" />
            <Chip label="5 days" color="primary" />
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
            <Box display="flex" justifyContent="flex-start" alignItems="center" gridGap={3}>
              {["React", "Material UI", "Firebase"].map((skill, idx) => (
                <Chip
                  label={skill}
                  key={idx}
                  color={idx % 2 === 0 ? "primary" : "secondary"}
                  variant="outlined"
                />
              ))}
            </Box>
            <Typography variant="h6" color="primary">
              5000Tk
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default JobCard;
