"use client";
import { Card, Typography, Button, Box } from "@mui/material";

export default function About() {
  const handleDownload = () => {
    window.location.href = "http://localhost:3000/api/export";
  };
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        backgroundColor: "background.default",
      }}
      style={{
        padding: 32,
      }}
    >
      <Typography variant="h3" fontWeight={"bold"} color="primary">
        Generate
      </Typography>
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
          variant="h4"
          fontWeight={"bold"}
          color="primary"
          width={"100%"}
        >
          Project Background
        </Typography>
        <Typography variant="body1" color="primary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Box>
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
          variant="h4"
          fontWeight={"bold"}
          color="primary"
          width={"100%"}
        >
          Bias Score
        </Typography>
        <Typography variant="body1" color="primary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Box>
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
          variant="h4"
          fontWeight={"bold"}
          color="primary"
          width={"100%"}
        >
          Generating Data
        </Typography>
        <Typography variant="body1" color="primary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Box>

      <Button
        variant="contained"
        style={{ padding: 16, borderRadius: 16, fontSize: 16 }}
        onClick={handleDownload}
      >
        Download Excel File
      </Button>
    </Box>
  );
}
