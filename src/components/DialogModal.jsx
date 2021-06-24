import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

const DialogModal = ({
  open,
  setOpen,
  title,
  bodyText,
  body = "",
  actions,
}) => {
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{bodyText}</DialogContentText>
          {body}
        </DialogContent>

        <DialogActions>{actions}</DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogModal;
