import React from "react";
import { Box, Button } from "@material-ui/core";
import { AiOutlineHeart } from "react-icons/ai";

const FavoriteBtn = () => {
  return (
    <Box>
      <Button>
        <AiOutlineHeart />
      </Button>
    </Box>
  );
};

export default FavoriteBtn;
