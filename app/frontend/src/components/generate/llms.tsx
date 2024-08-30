"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

interface LLMSProps {
  llms: { name: string; checked: boolean }[];
  setLLMS: React.Dispatch<
    React.SetStateAction<{ name: string; checked: boolean }[]>
  >;
}

export default function LLMS({ llms, setLLMS }: LLMSProps) {
  const handleCheckboxChange = (name: string) => {
    setLLMS((prevLLMS) =>
      prevLLMS.map((llm) =>
        llm.name === name ? { ...llm, checked: !llm.checked } : llm
      )
    );
  };
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
        {llms.map((llm) => (
          <FormControlLabel
            key={llm.name}
            control={
              <Checkbox
                checked={llm.checked}
                onChange={() => handleCheckboxChange(llm.name)}
              />
            }
            label={llm.name}
          />
        ))}
      </Box>
    </Card>
  );
}
