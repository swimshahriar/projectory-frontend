import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import OrderCard from "./OrderCard";
// internal imports

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

const OrdersTabs = ({ requested, active, finished, canceled }) => {
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
          <Tab label={`Active (${active?.length || 0})`} {...a11yProps(1)} />
          <Tab label={`Finished (${finished?.length || 0})`} {...a11yProps(2)} />
          <Tab label={`Canceled (${canceled?.length || 0})`} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {requested && requested.length > 0
          ? requested.map((order) => <OrderCard key={order.id} order={order} />)
          : "No Order Requests!"}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {active && active.length > 0
          ? active.map((order) => <OrderCard key={order.id} order={order} />)
          : "No Active Order!"}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {finished && finished.length > 0
          ? finished.map((order) => <OrderCard key={order.id} order={order} />)
          : "No Finished Order!"}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {canceled && canceled.length > 0
          ? canceled.map((order) => <OrderCard key={order.id} order={order} />)
          : "No Canceled Order!"}
      </TabPanel>
    </div>
  );
};

export default OrdersTabs;
