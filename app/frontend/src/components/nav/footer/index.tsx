import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Container
      sx={{
        minWidth: "100vw",
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        height: "5vh",
      }}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 8,
      }}
    >
      <Typography variant="body1" fontWeight={"bold"}>
        University of Auckland Part IV Project #119
      </Typography>
      <Typography variant="body1">Nathan Bell and Troy Murdoch</Typography>
      <Typography variant="body1">©2024</Typography>
    </Container>
  );
};

export default Footer;
