import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Container
      sx={{
        minWidth: "100vw",
        backgroundColor: "primary.main",
        color: "primary.contrastText",
      }}
      style={{ padding: 10 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h7" fontWeight={"bold"}>
          University of Auckland Part IV Project #119
        </Typography>
        <Typography variant="h7">Nathan Bell and Troy Murdoch</Typography>
        <Typography variant="h7">©2024</Typography>
      </Box>
    </Container>
  );
};

export default Footer;
