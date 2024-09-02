"use client";

import React from "react";
import { Typography, Box, Button } from "@mui/material";

interface GenerateAreaProps {
  onGenerate: () => void;
}

export default function GenerateArea({ onGenerate }: GenerateAreaProps) {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onGenerate}
      style={{ padding: 16, borderRadius: 16, fontSize: 24 }}
    >
      Generate data!
    </Button>
  );
}
