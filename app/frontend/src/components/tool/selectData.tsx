"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Select,
  Typography,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import axios from "axios";

export default function SelectData({
  selectedData,
  setSelectedData,
  numOfGenerations,
  setNumOfGenerations,
}: {
  selectedData: string;
  setSelectedData: React.Dispatch<React.SetStateAction<string>>;
  numOfGenerations: { [key: string]: number };
  setNumOfGenerations: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
}) {
  const [generateData, setGenerateData] = useState(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedData(event.target.value);
  };

  const checkGenerateData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/llm/`, {
        params: {
          selectedData: "generated_data",
        },
      });
      if ((await response.data.length) > 0) {
        setGenerateData(true);
      }
    } catch (error) {
      setGenerateData(false);
    }
  };

  const fetchNumGenerations = async (data: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/num_generations`,
        {
          params: {
            selectedData: data,
          },
        }
      );
      setNumOfGenerations((prevState) => ({
        ...prevState,
        [data]: response.data.num_generations,
      }));
    } catch (error) {
      console.error(`Error fetching number of generations:`, error);
      setNumOfGenerations((prevState) => ({
        ...prevState,
        [data]: 0,
      }));
    }
  };
  useEffect(() => {
    checkGenerateData();
    fetchNumGenerations("default_data");
    fetchNumGenerations("generated_data");
  }, [selectedData]);

  useEffect(() => {
    if (numOfGenerations["generated_data"] == 0) {
      setSelectedData("default_data");
    }
  }, [numOfGenerations]);

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      style={{ padding: 16 }}
    >
      <Typography
        variant="h5"
        gutterBottom
        color="primary"
        sx={{ fontWeight: "bold", mt: "2px" }}
        style={{ marginBottom: "16px" }}
      >
        Select Data
      </Typography>
      <Select
        id="data-select"
        value={selectedData}
        onChange={handleChange}
        sx={{
          width: "100%",
          bgcolor: "white",
          borderRadius: "5px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          fontSize: "body1",
        }}
        style={{ padding: 8 }}
      >
        <MenuItem
          value="default_data"
          style={{ padding: 8 }}
          sx={{ fontSize: "body1" }}
        >
          Default Data ({numOfGenerations["default_data"]} Generations)
        </MenuItem>
        {(generateData || selectedData === "generated_data") && (
          <MenuItem
            value="generated_data"
            style={{ padding: 8 }}
            sx={{ fontSize: "body1" }}
          >
            Recently Generated Data ({numOfGenerations["generated_data"] + " "}
            Generations)
          </MenuItem>
        )}
      </Select>
    </Box>
  );
}
