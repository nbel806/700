"use client";
import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";

interface LLMCompareProps {
  llm1: string;
  setLlm1: React.Dispatch<React.SetStateAction<string>>;
  llm2: string;
  setLlm2: React.Dispatch<React.SetStateAction<string>>;
  selectedData: string;
  setNamesAreChanged: React.Dispatch<React.SetStateAction<boolean>>;
  namesAreChanged: boolean;
}

export interface Group {
  name: string;
  checked: boolean;
}

export default function LLMCompare({
  llm1,
  setLlm1,
  llm2,
  setLlm2,
  selectedData,
  setNamesAreChanged,
  namesAreChanged,
}: LLMCompareProps) {
  const [llmNames, setLlmNames] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const handleLlm1Change = (event: SelectChangeEvent<string>) => {
    setLlm1(event.target.value);
  };

  const handleLlm2Change = (event: SelectChangeEvent<string>) => {
    setLlm2(event.target.value);
  };

  useEffect(() => {
    const fetchLlmNames = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/llm", {
          params: {
            selectedData,
          },
        });
        const names = response.data;
        setLlmNames(names);

        if (names.length > 0) {
          setLlm1(names[0]);
        }
        if (names.length > 1) {
          setLlm2(names[1]);
        } else if (names.length === 1) {
          setLlm2("");
        }
        setNamesAreChanged(!namesAreChanged);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch LLM names");
        setLoading(false);
      }
    };

    fetchLlmNames();
  }, [selectedData]);

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 2,
      }}
      style={{
        padding: 16,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        color="primary"
        sx={{ fontWeight: "bold", mt: "2px" }}
        style={{ marginBottom: 8 }}
      >
        Compare LLMs
      </Typography>
      {loading && <Typography color="primary">Loading LLMs...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              width: "100%",
            }}
          >
            <Typography variant="h6" color="black">
              LLM 1
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                width: "100%",
              }}
            >
              <Select
                id="llm1-select"
                value={llm1}
                onChange={handleLlm1Change}
                displayEmpty
                sx={{
                  width: "100%",
                  bgcolor: "white",
                  borderRadius: "5px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  fontSize: "body1",
                }}
                style={{ padding: 8, width: "100%" }}
              >
                {llmNames.map((name, index) => (
                  <MenuItem
                    key={index}
                    value={name}
                    style={{ padding: 8 }}
                    sx={{ fontSize: "body1" }}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              width: "100%",
            }}
          >
            <Typography variant="h6" color="black" style={{ marginTop: 8 }}>
              LLM 2
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
              }}
            >
              <Select
                id="llm2-select"
                value={llm2}
                onChange={handleLlm2Change}
                displayEmpty
                sx={{
                  width: "100%",
                  bgcolor: "white",
                  borderRadius: "5px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  fontSize: "body1",
                }}
                style={{ padding: 8, marginBottom: 8 }}
              >
                {llmNames.map((name, index) => (
                  <MenuItem
                    key={index}
                    value={name}
                    style={{ padding: 8 }}
                    sx={{ fontSize: "body1" }}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
