import { Box, Chip, Grow, Paper, Typography } from "@material-ui/core";
import React from "react";

const TestResultCard = ({ result }) => (
  <Grow in timeout={500}>
    <Box minWidth="18rem" width="30%" maxWidth="22rem" flexGrow={1}>
      <Paper>
        <Box py={3} px={2}>
          <Typography variant="h6" gutterBottom>
            {result?.title}
          </Typography>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            flexWrap="wrap"
            gridGap={12}
            my={3}
          >
            <Chip
              color="secondary"
              label={`${result.questions && Object.keys(result?.questions).length} ques`}
            />
            <Chip
              color="primary"
              label={`${result.answers && Object.keys(result?.answers).length} answered`}
            />
            <Chip color="secondary" label={`${result && result?.percent}% marks`} />
            <Chip
              color={result?.pass ? "primary" : "secondary"}
              label={result?.pass ? "passed" : "failed"}
            />
            <Chip label={new Date(result?.createdAt).toDateString()} />
          </Box>
        </Box>
      </Paper>
    </Box>
  </Grow>
);

export default TestResultCard;
