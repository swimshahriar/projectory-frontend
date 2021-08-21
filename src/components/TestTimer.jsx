import { Box, Typography } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";

const TestTimer = ({ time, setIsTimeFinish }) => {
  const timeInSec = time * 60;
  const startTime = moment.now();
  const endTime = startTime + timeInSec;
  const remainingTime = endTime - startTime;
  const [duration, setDuration] = useState(moment.duration(remainingTime * 1000, "milliseconds"));

  // ---------------- update time in every second ----------------
  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((prev) => moment.duration(prev - 1000, "milliseconds"));
    }, 1000);

    if (duration.minutes() <= 0 && duration.seconds() <= 0) {
      setIsTimeFinish(true);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [duration, setIsTimeFinish]);

  return (
    <Box>
      <Typography variant="h6" color="primary">{`${
        duration.minutes() > 0 ? duration.minutes() : 0
      } : ${duration.seconds() > 0 ? duration.seconds() : 0}`}</Typography>
    </Box>
  );
};

export default TestTimer;
