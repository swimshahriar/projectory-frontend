import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
// internal imports
import PaymentCard from "./PaymentCard";

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

const PaymentsTabs = ({ requested, succeed, canceled, topup = false }) => {
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
          <Tab label={`Requests (${requested?.length || 0})`} {...a11yProps(0)} />
          <Tab label={`Succeed (${succeed?.length || 0})`} {...a11yProps(1)} />
          <Tab label={`Canceled/Failed (${canceled?.length || 0})`} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gridGap={15}
        >
          {requested && requested.length > 0
            ? requested.map((item) => <PaymentCard key={item.id} payment={item} />)
            : `No ${topup ? "Topup" : "Withdraw"} Requests!`}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gridGap={15}
        >
          {succeed && succeed.length > 0
            ? succeed.map((item) => <PaymentCard key={item.id} payment={item} />)
            : `No Succeed ${topup ? "Topup" : "Withdraw"}!`}
        </Box>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gridGap={15}
        >
          {canceled && canceled.length > 0
            ? canceled.map((item) => <PaymentCard key={item.id} payment={item} />)
            : `No Canceled ${topup ? "Topup" : "Withdraw"}!`}
        </Box>
      </TabPanel>
    </div>
  );
};

export default PaymentsTabs;
