import React from "react";
import Link from "next/link";
import { Box, Card, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Container
      sx={{
        minWidth: "100vw",
        backgroundColor: "primary.main",
        color: "primary.contrastText",
      }}
      style={{ padding: 32 }}
    >
      <Box>
        <Typography variant="h6" fontWeight={"bold"}>
          University of Auckland Part IV Project #119
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 8 }}
      >
        <Typography variant="h6">Nathan Bell and Troy Murdoch</Typography>
        <Typography variant="h6">©2024</Typography>
      </Box>
    </Container>
  );
};

export default Footer;
