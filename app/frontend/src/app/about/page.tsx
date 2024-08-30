"use client";
import { Card, Typography, Button } from "@mui/material";

export default function About() {
  const handleDownload = () => {
    window.location.href = "http://localhost:3000/api/export";
  };
  return (
    <>
      <Card>
        <Typography variant="h1">About</Typography>
        <Button variant="contained" onClick={handleDownload}>
          Download Excel File
        </Button>
      </Card>
    </>
  );
}
