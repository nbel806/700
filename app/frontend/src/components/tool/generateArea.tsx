"use client";

import React from "react";
import { Typography, Box, Button } from "@mui/material";
import Link from "next/link";

export default function GenerateArea() {
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid #e2e2e2",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
      style={{
        padding: "10px",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", mt: "2px" }}
      >
        Generate your own data
      </Typography>
      <Link href="/generate" passHref>
        <Button variant="contained" color="primary">
          Generate
        </Button>
      </Link>
    </Box>
  );
}
