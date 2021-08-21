import { Box, FormControlLabel, Paper, Radio, RadioGroup, Typography } from "@material-ui/core";
import React, { useState } from "react";

const QuestionWithOptions = ({ qnum, question, options, setAnswers }) => {
  const [value, setValue] = useState("");

  // handle change
  const handleChange = (e) => {
    setValue(e.target.value);

    setAnswers((prev) => (prev ? [...prev, [qnum, e.target.value]] : [[qnum, e.target.value]]));
  };

  return (
    <Paper>
      <Box py={3} px={2}>
        <Box>
          <Typography variant="h6">
            <Typography component="span" variant="h6">
              {qnum}.
            </Typography>
            {` ${question}`}
          </Typography>
        </Box>

        {/* ------------------- options -------------------- */}
        <Box mt={3}>
          <RadioGroup aria-label="options" name={question} value={value} onChange={handleChange}>
            {options.map((option, idx) => (
              <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </Box>
      </Box>
    </Paper>
  );
};

export default QuestionWithOptions;
