import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderAction";
// internal imports
import DialogModal from "./DialogModal";
import SweetAlert from "./SweetAlert";

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
const TabContent = ({ packageInfo, sid, userId, userName, serviceName }) => {
  const [open, setOpen] = useState(false);
  const [brief, setBrief] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { res, isLoading } = useSelector((state) => state.orders);

  // handle submit
  const handleSubmit = async () => {
    if (brief !== "") {
      const finalData = {
        title: serviceName,
        package: packageInfo.name,
        price: packageInfo.price,
        features: packageInfo.features,
        duration: packageInfo.deliveryTime,
        serviceId: sid,
        type: "services",
        recPersonId: userId,
        recPersonUserName: userName,
        brief,
      };

      await dispatch(createOrder(finalData, token));
    }
  };

  // check if order created
  useEffect(() => {
    if (res) {
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
    }

    return () => dispatch({ type: "RESET_ORDER" });
  }, [res, dispatch]);

  return (
    <>
      {/* ------------------- dialog modal -------------------- */}
      <DialogModal
        title="Request Service"
        open={open}
        setOpen={setOpen}
        bodyText={
          <Box my={2}>
            <Typography>
              {packageInfo.name} - {packageInfo.price} tk
            </Typography>
          </Box>
        }
        body={
          <Box my={2}>
            <TextField
              required
              label="about your work"
              variant="outlined"
              multiline
              rows={7}
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
            />
          </Box>
        }
        actions={
          <Box my={2}>
            {!isLoading ? (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Order
              </Button>
            ) : (
              <CircularProgress color="primary" />
            )}
          </Box>
        }
      />

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

      {/* ---------------------- continue button --------------------- */}
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setOpen((prev) => !prev)}
        >
          Continue ({packageInfo.price}tk)
        </Button>
      </Box>
    </>
  );
};

const PriceTab = ({ packages, sid, userId, userName, serviceName }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const basicInfo = packages[0];
  const standardInfo = packages[1];
  const premiumInfo = packages[2];

  return (
    <div className={classes.root} style={{ minWidth: "350px" }}>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange} aria-label="price tabs">
          <Tab label="Basic" {...a11yProps(0)} />
          <Tab label="Standard" {...a11yProps(1)} />
          <Tab label="Premium" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TabContent
          sid={sid}
          userId={userId}
          userName={userName}
          serviceName={serviceName}
          packageInfo={basicInfo}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabContent
          sid={sid}
          userId={userId}
          userName={userName}
          serviceName={serviceName}
          packageInfo={standardInfo}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabContent
          sid={sid}
          userId={userId}
          userName={userName}
          serviceName={serviceName}
          packageInfo={premiumInfo}
        />
      </TabPanel>
    </div>
  );
};

export default PriceTab;
