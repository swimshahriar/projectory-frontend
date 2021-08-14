import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
// internal imports
import JobCard from "./JobCard";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const PostedJobsTab = ({ publicJobs, activeJobs, finishedJobs, canceledJobs }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label={`Public (${publicJobs?.length || 0})`} {...a11yProps(0)} />
          <Tab label={`Active (${activeJobs?.length || 0})`} {...a11yProps(1)} />
          <Tab label={`Finished (${finishedJobs?.length || 0})`} {...a11yProps(2)} />
          <Tab label={`Canceled (${canceledJobs?.length || 0})`} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {publicJobs && publicJobs.length > 0
          ? publicJobs.map((job, idx) => <JobCard key={idx} job={job} />)
          : "No Public Jobs!"}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {activeJobs && activeJobs.length > 0
          ? activeJobs.map((job, idx) => <JobCard key={idx} job={job} />)
          : "No Active Jobs!"}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {finishedJobs && finishedJobs.length > 0
          ? finishedJobs.map((job, idx) => <JobCard key={idx} job={job} />)
          : "No Finished Jobs!"}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {canceledJobs && canceledJobs.length > 0
          ? canceledJobs.map((job, idx) => <JobCard key={idx} job={job} />)
          : "No Canceled Jobs!"}
      </TabPanel>
    </div>
  );
};

export default PostedJobsTab;
