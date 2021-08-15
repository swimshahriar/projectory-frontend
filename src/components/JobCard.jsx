import { Box, Chip, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// internal imports
import { deleteJob } from "../actions/jobAction";
import AvatarWithUserName from "./AvatarWithUserName";
import SweetAlert from "./SweetAlert";

// styles
const useStyles = makeStyles(() => ({
  jobCard: {
    cursor: "pointer",
  },
  btn: {
    cursor: "pointer",
  },
}));

const JobCard = ({ job }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { uid, token } = useSelector((state) => state.auth);

  return (
    <Box minWidth="300px" width="100%" my={3}>
      <Paper>
        <Box
          py={3}
          px={4}
          className={classes.jobCard}
          onClick={() => history.push(`/job-details/${job._id}`)}
        >
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
            <Chip label={job.status} color="secondary" />
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
            <Box display="flex" justifyContent="flex-start" alignItems="center" gridGap={10}>
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

        {/* --------------- edit and delete btn ----------------- */}

        {job.userId === uid && job.status === "public" && (
          <Box ml={3} display="flex" gridGap={10}>
            <Typography
              className={classes.btn}
              color="primary"
              onClick={() => history.push(`/edit-job/${job._id}`)}
            >
              <BiEdit />
            </Typography>
            <Typography
              className={classes.btn}
              color="error"
              onClick={async () => {
                SweetAlert.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#36B466",
                  cancelButtonColor: "#F3826E",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(deleteJob(job._id, token)).then(() =>
                      setTimeout(() => {
                        SweetAlert.fire("Deleted!", "Your file has been deleted.", "success");
                        window.location.reload();
                      }, 1000)
                    );
                  }
                });
              }}
            >
              <AiFillDelete />
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default JobCard;
