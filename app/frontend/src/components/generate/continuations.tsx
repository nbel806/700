"use client";
import React, { useState, ChangeEvent } from "react";
import {
  Typography,
  Card,
  TextField,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
interface ContinuationsProps {
  continuationsNumber: number;
  setContinuationsNumber: (value: number) => void;
}

export default function Continuations({
  continuationsNumber,
  setContinuationsNumber,
}: ContinuationsProps) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newContinuationsNumber = Number(event.target.value);
    if (
      event.target.value === "" ||
      (newContinuationsNumber >= 1 && newContinuationsNumber <= 999)
    ) {
      setContinuationsNumber(newContinuationsNumber);
    }
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Card
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #f5f5f5",
        position: "relative",
      }}
    >
      <Typography variant="h6" style={{ marginBottom: "16px" }}>
        Continuations
      </Typography>

      <TextField
        type="number"
        value={continuationsNumber}
        onChange={handleChange}
        inputProps={{
          max: 999,
          style: {
            textAlign: "center",
            padding: "0px",
            height: "auto",
            boxSizing: "border-box",
          },
          step: "any",
        }}
        sx={{
          width: "70px",
          "& input": {
            textAlign: "center",
          },
          "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
            {
              WebkitAppearance: "none",
            },
        }}
        variant="outlined"
      />
      <Tooltip title="Information about the Continuation number">
        <IconButton
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            color: "primary",
          }}
          aria-label="info"
          onClick={handleClickOpen}
        >
          <InfoIcon sx={{ fontSize: 36 }} />
        </IconButton>
      </Tooltip>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle style={{ paddingTop: 8, textAlign: "center" }}>
          Continuations Number Information
        </DialogTitle>
        <DialogContent style={{ padding: 16 }}>
          <Typography variant="body1" color="primary">
            . For more information...
          </Typography>
        </DialogContent>
        <DialogActions style={{ padding: 8 }}>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
