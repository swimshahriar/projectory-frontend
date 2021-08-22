import { Box, Button, Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// internal imports
import { logOutHandler } from "../../actions/authAction";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <Box fontSize="1.3rem">
          <FaUser />
        </Box>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            history.push(`user-profile/${uid}`);
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          Orders
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          Earnings
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            history.push("/skill-tests");
          }}
        >
          Skill Tests
        </MenuItem>
        <MenuItem
          onClick={async () => {
            await dispatch(logOutHandler());
            setAnchorEl(null);
            document.getElementById("nav").classList.remove("show");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
