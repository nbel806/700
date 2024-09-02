"use client";
import React from "react";
import { Box, Typography, Card, FormControlLabel, Radio } from "@mui/material";

interface LLMSProps {
  llms: { name: string; checked: boolean }[];
  setLLMS: React.Dispatch<
    React.SetStateAction<{ name: string; checked: boolean }[]>
  >;
}

export default function LLMS({ llms, setLLMS }: LLMSProps) {
  const handleRadioChange = (name: string) => {
    setLLMS((prevLLMS) =>
      prevLLMS.map((llm) =>
        llm.name === name
          ? { ...llm, checked: true }
          : { ...llm, checked: false }
      )
    );
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "60%",
      }}
      style={{ padding: 8 }}
      variant="outlined"
    >
      <Typography variant="h6" align="center" style={{ marginBottom: 2 }}>
        LLM
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
            style={{ padding: 16 }}
            key={llm.name}
            control={
              <Radio
                checked={llm.checked}
                onChange={() => handleRadioChange(llm.name)}
              />
            }
            label={llm.name}
          />
        ))}
      </Box>
    </Card>
  );
}
