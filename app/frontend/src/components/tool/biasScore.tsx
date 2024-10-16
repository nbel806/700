"use client";

import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Rating,
  IconButton,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import axios from "axios";

interface BiasScoreProps {
  llm1: string;
  llm2: string;
  selectedData: string;
  namesAreChanged: boolean;
}

export default function BiasScore({
  llm1,
  llm2,
  selectedData,
  namesAreChanged,
}: BiasScoreProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [llm1Score, setLlm1Score] = useState<number | null>(null);
  const [llm2Score, setLlm2Score] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const fetchBiasScore = async (
    llm: string,
    setScore: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/llm/score/${llm}`,
        {
          params: {
            selectedData,
          },
        }
      );
      setScore(response.data.score);
    } catch (error) {
      console.error(`Error fetching bias score for ${llm}:`, error);
      setError(`Error fetching score for ${llm}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (llm1) {
      fetchBiasScore(llm1, setLlm1Score);
    }
  }, [llm1, namesAreChanged]);

  useEffect(() => {
    if (llm2) {
      fetchBiasScore(llm2, setLlm2Score);
    }
  }, [llm2, namesAreChanged]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "80%",
        position: "relative",
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
      style={{ padding: "20px" }}
    >
      <EmojiEventsIcon sx={{ fontSize: 40 }} color="primary" />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          sx={{ flex: 1, textAlign: "center" }}
        >
          {llm1 || ""}
        </Typography>
        <Typography
          variant="h5"
          color="primary"
          fontWeight={"bold"}
          sx={{ flex: 1, textAlign: "center" }}
        >
          Bias Star Rating
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          sx={{ flex: 1, textAlign: "center" }}
        >
          {llm2 || ""}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          {loading ? (
            <Typography color="primary">Loading...</Typography>
          ) : llm1Score !== null ? (
            <Rating value={llm1Score} precision={0.5} readOnly />
          ) : (
            <Typography color="primary">Loading LLM1</Typography>
          )}
        </Box>

        <Typography
          variant="body1"
          color="primary"
          sx={{ flex: 1, textAlign: "center" }}
        >
          {llm2 !== "" ? "vs" : ""}
        </Typography>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          {loading ? (
            <Typography color="primary">Loading...</Typography>
          ) : llm2Score !== null ? (
            <>
              {llm2 !== "" && (
                <Rating value={llm2Score} precision={0.5} readOnly />
              )}
            </>
          ) : (
            <Typography color="primary">
              {llm2 !== "" ? "Loading LLM2" : ""}
            </Typography>
          )}
        </Box>
      </Box>

      <Tooltip title="Information about the score">
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
          <InfoIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Tooltip>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle style={{ paddingTop: 8, textAlign: "center" }}>
          Score Information
        </DialogTitle>
        <DialogContent style={{ padding: 16 }}>
          <Typography variant="body1" color="primary">
            We calculate our LLM bias score by comparing demographic groups. If
            each demographic group has a similar number of positive and negative
            continuations, then the LLM will receive a high score. For more
            infomation see the Bias Detection Process section in the About page.
          </Typography>
        </DialogContent>
        <DialogActions style={{ padding: 8 }}>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
