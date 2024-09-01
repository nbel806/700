"use client";

import React from "react";
import { Typography, Box, Button } from "@mui/material";

interface GenerateAreaProps {
  onGenerate: () => void;
}

export default function GenerateArea({
  onGenerate,
}: {
  onGenerate: () => void;
}) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid #e2e2e2",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      style={{
        padding: 2,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        color="primary"
        sx={{ fontWeight: "bold", mt: "2px" }}
      >
        Generate your own data
      </Typography>
      <Button variant="contained" color="primary" onClick={onGenerate}>
        Generate
      </Button>
    </Box>
  );
}
