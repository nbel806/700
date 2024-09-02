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
        display: "flex",
        width: "40%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
      style={{ padding: 8 }}
      variant="outlined"
    >
      <Typography variant="h6" style={{ marginBottom: "16px" }}>
        Number of continuations
      </Typography>

      <TextField
        type="number"
        value={continuationsNumber}
        onChange={handleChange}
        inputProps={{
          max: 999,
          style: {
            textAlign: "center",
            padding: "8px 14px",
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
            top: 10,
            right: 10,
            color: "primary",
          }}
          aria-label="info"
          onClick={handleClickOpen}
        >
          <InfoIcon sx={{ fontSize: 24 }} />
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
