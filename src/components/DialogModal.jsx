import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import React from "react";

const DialogModal = ({ open, setOpen, title, bodyText, body = "", actions }) => (
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

export default DialogModal;
