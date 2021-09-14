import { Box } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";

const PaginationComponent = ({ totalItems, itemsPerPage, page, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const currentPageHandler = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box my={5} display="flex" justifyContent="flex-end" alignItems="center">
      <Pagination
        onChange={currentPageHandler}
        page={page}
        count={pageNumbers.length}
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </Box>
  );
};

export default PaginationComponent;
