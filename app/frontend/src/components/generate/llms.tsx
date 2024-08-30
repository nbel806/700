import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export default function LLMS() {
  return (
    <Card
      sx={{
        flex: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #f5f5f5",
      }}
      style={{ padding: "20px" }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ marginBottom: 2 }}
        style={{ marginBottom: "16px" }}
      >
        LLMS
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <FormControlLabel control={<Checkbox />} label="GPT-2" />
        <FormControlLabel control={<Checkbox />} label="BERT" />
        <FormControlLabel control={<Checkbox />} label="PHI" />
        <FormControlLabel control={<Checkbox />} label="LLAMA" />
        <FormControlLabel control={<Checkbox />} label="GEMMA" />
      </Box>
    </Card>
  );
}
