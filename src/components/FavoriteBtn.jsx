import { Typography } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
// actions
import { makeFavoriteService } from "../actions/serviceAction";

const FavoriteBtn = ({ sid, token }) => {
  const [isFavService, setIsFavService] = useState(false);
  const dispatch = useDispatch();
  const { favServices } = useSelector((state) => state.services);

  useMemo(() => {
    if (favServices && favServices.some((service) => service._id === sid)) {
      setIsFavService((prev) => !prev);
    }
  }, [favServices, sid]);

  return (
    <Typography
      style={{ cursor: "pointer" }}
      color="error"
      onClick={async () => {
        await dispatch(makeFavoriteService(sid, token));
      }}
    >
      {isFavService ? <AiFillHeart /> : <AiOutlineHeart />}
    </Typography>
  );
};

export default FavoriteBtn;
