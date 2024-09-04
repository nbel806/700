"use client";

import React from "react";
import {
  Box,
  Select,
  Typography,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";

export default function SelectData({
  selectedData,
  setSelectedData,
}: {
  selectedData: string;
  setSelectedData: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedData(event.target.value);
  };
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
        <MenuItem value="default_data">Default Data</MenuItem>
        <MenuItem value="generated_data">Recently Generated Data</MenuItem>
      </Select>
    </Box>
  );
}
