import { Box, Button, TextField } from "@material-ui/core";
import React from "react";

const Search = ({ search, setSearch, onclick, cat }) => (
  <Box
    width="30rem"
    minWidth="18rem"
    display="flex"
    justifyContent="center"
    alignItems="center"
    gridGap={15}
  >
    <TextField
      label={`in ${cat || "all category"}`}
      variant="outlined"
      fullWidth
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <Button variant="contained" color="primary" size="large" onClick={onclick}>
      Search
    </Button>
  </Box>
);

export default Search;
