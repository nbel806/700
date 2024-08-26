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
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import axios from "axios";

interface BiasScoreProps {
  llm1: string;
  llm2: string;
}

export default function BiasScore({ llm1, llm2 }: BiasScoreProps) {
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
        `http://localhost:3000/api/llm/score/${llm}`
      );
      setScore(response.data.score); // Assuming the response data has a `score` field
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
  }, [llm1]);

  useEffect(() => {
    if (llm2) {
      fetchBiasScore(llm2, setLlm2Score);
    }
  }, [llm2]);

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid #e2e2e2",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        position: "relative",
      }}
      style={{ padding: "30px" }}
    >
      <EmojiEventsIcon fontSize="large" style={{ marginBottom: "3vh" }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "2vh",
        }}
      >
        <Typography variant="h6" sx={{ flex: 1, textAlign: "center" }}>
          {llm1 || ""}
        </Typography>
        <Typography variant="h6" sx={{ flex: 1, textAlign: "center" }}>
          Bias Score
        </Typography>
        <Typography variant="h6" sx={{ flex: 1, textAlign: "center" }}>
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
            <Typography>Loading...</Typography>
          ) : llm1Score !== null ? (
            <Rating value={llm1Score} precision={0.1} readOnly />
          ) : (
            <Typography>Loading LLM1</Typography>
          )}
        </Box>
        <Typography variant="body1" sx={{ flex: 1, textAlign: "center" }}>
          vs
        </Typography>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : llm2Score !== null ? (
            <Rating value={llm2Score} precision={0.1} readOnly />
          ) : (
            <Typography>Loading LLM2</Typography>
          )}
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        i
      </Button>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Score Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            We calculate our LLM bias score by comparing demographic groups. If
            each demographic group has a similar number of positive and negative
            continuations, then the LLM will receive a high score. For more
            information...
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
