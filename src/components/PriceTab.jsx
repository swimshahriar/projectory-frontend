import { AppBar, Box, Button, Divider, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Paper>
          <Box p={3}>{children}</Box>
        </Paper>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

// tabcontent
const TabContent = ({ packageInfo }) => (
  <>
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h6" gutterBottom>
        {packageInfo.name.toUpperCase()}
      </Typography>

      <Box display="flex" justifyItems="center" alignItems="center" gridGap={5}>
        <AiOutlineFieldTime />
        <Typography variant="body1">{packageInfo.deliveryTime} days delivery</Typography>
      </Box>
    </Box>

    <Divider />

    <Box my={3}>
      {packageInfo.features.map((feature, idx) => (
        <Box display="flex" justifyItems="center" alignItems="center" gridGap={5} key={idx}>
          <BsArrowRight />
          <Typography variant="body1" gutterBottom>
            {feature}
          </Typography>
        </Box>
      ))}
    </Box>

    <Box display="flex" justifyContent="flex-end">
      <Button variant="contained" color="primary" size="large">
        Continue ({packageInfo.price}tk)
      </Button>
    </Box>
  </>
);

const PriceTab = ({ packages }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const basicInfo = packages[0];
  const standardInfo = packages[1];
  const premiumInfo = packages[2];

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Tabs value={value} onChange={handleChange} aria-label="price tabs">
          <Tab label="Basic" {...a11yProps(0)} />
          <Tab label="Standard" {...a11yProps(1)} />
          <Tab label="Premium" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TabContent packageInfo={basicInfo} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabContent packageInfo={standardInfo} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabContent packageInfo={premiumInfo} />
      </TabPanel>
    </div>
  );
};

export default PriceTab;
